import { reactive, ref } from 'vue'

import { useTemplateValidation } from './useTemplateValidation'
import { extractVariables, normalizeVariables } from '@/utils/variableParser'

import type { TemplateForm, TemplatePayload } from '@/types/template'
import type { ValidationError, ValidationField } from '@/types/validation'

type TemplateFormField = keyof TemplateForm

type TouchedFields = Record<TemplateFormField, boolean>

type ValidationErrors = Partial<Record<ValidationField, ValidationError[]>>

interface InsertVariableOptions {
  start?: number
  end?: number
}

function createDefaultForm(): TemplateForm {
  return {
    templateName: '',
    channel: null,
    language: 'zh-TW',
    title: '',
    content: '',
  }
}

function createDefaultTouchedFields(): TouchedFields {
  return {
    templateName: false,
    channel: false,
    language: false,
    title: false,
    content: false,
  }
}

function groupValidationErrors(errors: ValidationError[]): ValidationErrors {
  return errors.reduce<ValidationErrors>((errorsByField, error) => {
    errorsByField[error.field] = [...(errorsByField[error.field] ?? []), error]

    return errorsByField
  }, {})
}

function replaceValidationErrors(
  validationErrors: ValidationErrors,
  fields: ValidationField[],
  errors: ValidationError[],
): void {
  for (const field of fields) {
    delete validationErrors[field]
  }

  Object.assign(validationErrors, groupValidationErrors(errors))
}

function getVariableInsertRange(
  content: string,
  options: InsertVariableOptions,
): Required<InsertVariableOptions> {
  const start = options.start ?? content.length
  const end = options.end ?? start

  return {
    start: Math.max(0, Math.min(start, content.length)),
    end: Math.max(0, Math.min(end, content.length)),
  }
}

export function useTemplateForm() {
  const form = reactive<TemplateForm>(createDefaultForm())
  const touchedFields = reactive<TouchedFields>(createDefaultTouchedFields())
  const validationErrors = reactive<ValidationErrors>({})
  const submittedPayload = ref<TemplatePayload | null>(null)
  const { validateField, validateTemplate } = useTemplateValidation()

  function validateFields(fields: ValidationField[]): void {
    const errors = fields.flatMap((field) => validateField(field, form).errors)

    replaceValidationErrors(validationErrors, fields, errors)
  }

  function handleBlur(field: TemplateFormField): void {
    touchedFields[field] = true

    if (field === 'content') {
      validateFields(['content', 'variables'])
      return
    }

    validateFields([field])
  }

  function insertVariable(
    variableTemplate: string,
    options: InsertVariableOptions = {},
  ): void {
    const { start, end } = getVariableInsertRange(form.content, options)
    const insertStart = Math.min(start, end)
    const insertEnd = Math.max(start, end)

    form.content =
      form.content.slice(0, insertStart) +
      variableTemplate +
      form.content.slice(insertEnd)

    if (touchedFields.content) {
      validateFields(['content', 'variables'])
    }
  }

  function submit(): TemplatePayload | null {
    for (const field of Object.keys(touchedFields) as TemplateFormField[]) {
      touchedFields[field] = true
    }

    const validationResult = validateTemplate(form)
    replaceValidationErrors(
      validationErrors,
      ['templateName', 'channel', 'content', 'variables'],
      validationResult.errors,
    )

    if (!validationResult.isValid || !form.channel) {
      submittedPayload.value = null
      return null
    }

    const normalizedContent = normalizeVariables(form.content)
    form.content = normalizedContent

    const payload: TemplatePayload = {
      templateName: form.templateName.trim(),
      channel: form.channel,
      language: form.language,
      title: form.title.trim(),
      content: normalizedContent,
      variables: extractVariables(normalizedContent),
      submittedAt: new Date().toISOString(),
    }

    submittedPayload.value = payload

    return payload
  }

  return {
    form,
    touchedFields,
    validationErrors,
    submittedPayload,
    handleBlur,
    insertVariable,
    submit,
  }
}
