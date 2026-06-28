import { describe, expect, it } from 'vitest'

import {
  extractVariables,
  findUnknownVariables,
  hasInvalidVariableSyntax,
  normalizeVariables,
  replaceVariables,
} from './variableParser'

describe('variableParser', () => {
  describe('normalizeVariables', () => {
    it('normalizes supported variable spacing', () => {
      const content = 'Hi {{customer_name}}, order {{   order_id   }} is ready.'

      expect(normalizeVariables(content)).toBe(
        'Hi {{ customer_name }}, order {{ order_id }} is ready.',
      )
    })

    it('preserves unknown and invalid variable tokens', () => {
      const content = 'Hi {{ unknown_name }} and {{ customer-name }}.'

      expect(normalizeVariables(content)).toBe(content)
    })
  })

  describe('replaceVariables', () => {
    it('replaces supported variables with mock preview values', () => {
      const content =
        '{{ customer_name }} has order {{order_id}} from {{ shop_name }}.'

      expect(replaceVariables(content)).toBe(
        'Alex has order A1024 from Crystal Studio.',
      )
    })

    it('preserves unknown and invalid variables in preview text', () => {
      const content = 'Hi {{ unknown_name }} and {{ customer-name }}.'

      expect(replaceVariables(content)).toBe(content)
    })
  })

  describe('extractVariables', () => {
    it('extracts supported variables once in first-seen order', () => {
      const content =
        '{{ order_id }} {{ customer_name }} {{ order_id }} {{ shop_name }}'

      expect(extractVariables(content)).toEqual([
        'orderId',
        'customerName',
        'shopName',
      ])
    })

    it('ignores unknown and invalid variable tokens', () => {
      const content =
        '{{ customer_name }} {{ unknown_name }} {{ customer-name }}'

      expect(extractVariables(content)).toEqual(['customerName'])
    })
  })

  describe('findUnknownVariables', () => {
    it('returns unknown valid variable tokens once in first-seen order', () => {
      const content =
        '{{ unknown_name }} {{ customer_name }} {{ other_id }} {{ unknown_name }}'

      expect(findUnknownVariables(content)).toEqual([
        '{{ unknown_name }}',
        '{{ other_id }}',
      ])
    })

    it('ignores malformed variable tokens', () => {
      const content = '{{ customer-name }} {{ unknown_name }}'

      expect(findUnknownVariables(content)).toEqual(['{{ unknown_name }}'])
    })
  })

  describe('hasInvalidVariableSyntax', () => {
    it('accepts supported and unknown variables with valid syntax', () => {
      const content = 'Hi {{ customer_name }} and {{ unknown_name }}.'

      expect(hasInvalidVariableSyntax(content)).toBe(false)
    })

    it('detects malformed variable syntax', () => {
      expect(hasInvalidVariableSyntax('Hi {{ customer-name }}.')).toBe(true)
      expect(hasInvalidVariableSyntax('Hi {{ customer_name.')).toBe(true)
      expect(hasInvalidVariableSyntax('Hi customer_name }}.')).toBe(true)
    })
  })
})
