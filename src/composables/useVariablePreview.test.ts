import { ref } from 'vue'

import { describe, expect, it } from 'vitest'

import { emptyPreviewMessage, useVariablePreview } from './useVariablePreview'

describe('useVariablePreview', () => {
  it('replaces supported variables with preview values', () => {
    const content = ref(
      'Hi {{ customer_name }}, order {{ order_id }} is ready.',
    )
    const { previewContent } = useVariablePreview(content)

    expect(previewContent.value).toBe('Hi Alex, order A1024 is ready.')
  })

  it('updates the preview when content changes', () => {
    const content = ref('Hi {{ customer_name }}.')
    const { previewContent } = useVariablePreview(content)

    content.value = 'Welcome to {{ shop_name }}.'

    expect(previewContent.value).toBe('Welcome to Crystal Studio.')
  })

  it('preserves unknown variables in the preview', () => {
    const content = ref('Hi {{ unknown_name }}.')
    const { previewContent } = useVariablePreview(content)

    expect(previewContent.value).toBe('Hi {{ unknown_name }}.')
  })

  it('shows placeholder text when content is blank', () => {
    const content = ref('   ')
    const { previewContent } = useVariablePreview(content)

    expect(previewContent.value).toBe(emptyPreviewMessage)
  })

  it('does not mutate the original content', () => {
    const content = ref('Hi {{customer_name}}.')
    const { previewContent } = useVariablePreview(content)

    expect(previewContent.value).toBe('Hi Alex.')
    expect(content.value).toBe('Hi {{customer_name}}.')
  })
})
