import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'

import { useTemplateForm } from './useTemplateForm'

describe('useTemplateForm', () => {
  it('uses zh-TW as the default language', () => {
    const { form } = useTemplateForm()

    expect(form.language).toBe('zh-TW')
  })

  it('marks blurred fields as touched and stores field validation errors', () => {
    const { form, touchedFields, validationErrors, handleBlur } =
      useTemplateForm()

    form.templateName = ' '
    handleBlur('templateName')

    expect(touchedFields.templateName).toBe(true)
    expect(validationErrors.templateName).toEqual([
      expect.objectContaining({ field: 'templateName', type: 'required' }),
    ])
  })

  it('inserts a variable into the current content range', () => {
    const { form, insertVariable } = useTemplateForm()

    form.content = 'Hi , your order is ready.'
    insertVariable('{{ customer_name }}', { start: 3, end: 3 })

    expect(form.content).toBe('Hi {{ customer_name }}, your order is ready.')
  })

  it('clears submitted payload when submission fails validation', () => {
    const { submittedPayload, validationErrors, submit } = useTemplateForm()

    const payload = submit()

    expect(payload).toBeNull()
    expect(submittedPayload.value).toBeNull()
    expect(validationErrors.templateName).toEqual([
      expect.objectContaining({ type: 'required' }),
    ])
  })

  it('validates, normalizes, and stores the submitted payload', async () => {
    const { form, submittedPayload, submit } = useTemplateForm()

    form.templateName = ' Order update '
    form.channel = 'LINE'
    form.title = ' Shipping notice '
    form.content = 'Hi {{customer_name}}, order {{ order_id }} is ready.'

    const payload = submit()

    expect(payload).toEqual({
      templateName: 'Order update',
      channel: 'LINE',
      language: 'zh-TW',
      title: 'Shipping notice',
      content: 'Hi {{ customer_name }}, order {{ order_id }} is ready.',
      variables: ['customerName', 'orderId'],
      submittedAt: expect.any(String),
    })
    expect(form.content).toBe(payload?.content)

    await nextTick()

    expect(submittedPayload.value).toEqual(payload)
  })

  it('clears submitted payload when the submitted form changes', async () => {
    const { form, submittedPayload, submit } = useTemplateForm()

    form.templateName = 'Order update'
    form.channel = 'LINE'
    form.title = 'Shipping notice'
    form.content = 'Hi {{ customer_name }}, your order is ready.'

    const payload = submit()

    await nextTick()

    expect(submittedPayload.value).toEqual(payload)

    form.title = ''

    await nextTick()

    expect(submittedPayload.value).toBeNull()
  })
})
