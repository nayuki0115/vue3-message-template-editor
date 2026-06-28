import { describe, expect, it } from 'vitest'

import { useTemplateValidation } from './useTemplateValidation'

import type { TemplateForm } from '@/types/template'

function createTemplate(overrides: Partial<TemplateForm> = {}): TemplateForm {
  return {
    templateName: 'Order update',
    channel: 'LINE',
    language: 'zh-TW',
    title: '',
    content: 'Hi {{ customer_name }}, your order is ready.',
    ...overrides,
  }
}

describe('useTemplateValidation', () => {
  it('validates required template fields', () => {
    const { validateTemplate } = useTemplateValidation()

    const result = validateTemplate(
      createTemplate({
        templateName: ' ',
        channel: null,
        content: '',
      }),
    )

    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'templateName', type: 'required' }),
        expect.objectContaining({ field: 'channel', type: 'required' }),
        expect.objectContaining({ field: 'content', type: 'required' }),
      ]),
    )
  })

  it('treats title as optional', () => {
    const { validateTemplate } = useTemplateValidation()

    const result = validateTemplate(createTemplate({ title: '' }))

    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('validates the 500 character content limit', () => {
    const { validateField } = useTemplateValidation()

    const validResult = validateField(
      'content',
      createTemplate({
        content: 'a'.repeat(500),
      }),
    )
    const result = validateField(
      'content',
      createTemplate({
        content: 'a'.repeat(501),
      }),
    )

    expect(validResult.isValid).toBe(true)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'content',
        type: 'maxLength',
      }),
    )
  })

  it('reports unknown variables with the original token', () => {
    const { validateField } = useTemplateValidation()

    const result = validateField(
      'variables',
      createTemplate({
        content: 'Hi {{ unknown_name }}',
      }),
    )

    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'variables',
        type: 'unknownVariable',
        message: 'Unknown variable: {{ unknown_name }}.',
      }),
    )
    expect(result.errors).not.toContainEqual(
      expect.objectContaining({ type: 'invalidTemplateSyntax' }),
    )
  })

  it('reports invalid variable syntax separately from unknown variables', () => {
    const { validateField } = useTemplateValidation()

    const result = validateField(
      'variables',
      createTemplate({
        content: 'Hi {{ customer-name }}',
      }),
    )

    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'variables',
        type: 'invalidTemplateSyntax',
      }),
    )
    expect(result.errors).not.toContainEqual(
      expect.objectContaining({ type: 'unknownVariable' }),
    )
  })

  it('allows 5 consecutive spaces for WhatsApp and rejects 6', () => {
    const { validateField } = useTemplateValidation()

    const validResult = validateField(
      'content',
      createTemplate({
        channel: 'WhatsApp',
        content: 'Hello     Alex',
      }),
    )
    const invalidResult = validateField(
      'content',
      createTemplate({
        channel: 'WhatsApp',
        content: 'Hello      Alex',
      }),
    )

    expect(validResult.isValid).toBe(true)
    expect(invalidResult.errors).toContainEqual(
      expect.objectContaining({
        field: 'content',
        type: 'channelConstraint',
      }),
    )
  })
})
