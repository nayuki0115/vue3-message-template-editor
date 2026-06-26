import {
  findUnknownVariables,
  hasInvalidVariableSyntax,
} from '@/utils/variableParser'

import type { Channel, TemplateForm } from '@/types/template'
import type {
  ValidationError,
  ValidationField,
  ValidationResult,
} from '@/types/validation'

type TemplateValidationRule = (template: TemplateForm) => ValidationError[]

const maxContentLength = 500
const excessiveConsecutiveSpacesPattern = / {6,}/

function createValidationResult(errors: ValidationError[]): ValidationResult {
  return {
    isValid: errors.length === 0,
    errors,
  }
}

function validateRequiredTextField(
  value: string,
  field: ValidationField,
  message: string,
): ValidationError[] {
  if (value.trim().length > 0) {
    return []
  }

  return [
    {
      field,
      type: 'required',
      message,
    },
  ]
}

function validateTemplateName(template: TemplateForm): ValidationError[] {
  return validateRequiredTextField(
    template.templateName,
    'templateName',
    'Template name is required.',
  )
}

function validateChannel(template: TemplateForm): ValidationError[] {
  if (template.channel) {
    return []
  }

  return [
    {
      field: 'channel',
      type: 'required',
      message: 'Channel is required.',
    },
  ]
}

function validateContent(template: TemplateForm): ValidationError[] {
  const errors: ValidationError[] = [
    ...validateRequiredTextField(
      template.content,
      'content',
      'Content is required.',
    ),
  ]

  if (template.content.length > maxContentLength) {
    errors.push({
      field: 'content',
      type: 'maxLength',
      message: `Content cannot exceed ${maxContentLength} characters.`,
    })
  }

  return errors
}

function validateVariables(template: TemplateForm): ValidationError[] {
  const errors: ValidationError[] = []

  if (hasInvalidVariableSyntax(template.content)) {
    errors.push({
      field: 'variables',
      type: 'invalidTemplateSyntax',
      message: 'Content contains invalid variable syntax.',
    })
  }

  const unknownVariables = findUnknownVariables(template.content)

  if (unknownVariables.length > 0) {
    errors.push({
      field: 'variables',
      type: 'unknownVariable',
      message: `Unknown variable: ${unknownVariables.join(', ')}.`,
    })
  }

  return errors
}

const channelRules: Partial<Record<Channel, TemplateValidationRule[]>> = {
  WhatsApp: [
    (template) => {
      if (!excessiveConsecutiveSpacesPattern.test(template.content)) {
        return []
      }

      return [
        {
          field: 'content',
          type: 'channelConstraint',
          message:
            'WhatsApp content cannot contain more than 5 consecutive spaces.',
        },
      ]
    },
  ],
}

function validateChannelRules(template: TemplateForm): ValidationError[] {
  if (!template.channel) {
    return []
  }

  return (channelRules[template.channel] ?? []).flatMap((rule) =>
    rule(template),
  )
}

const fieldRules: Partial<Record<ValidationField, TemplateValidationRule[]>> = {
  templateName: [validateTemplateName],
  channel: [validateChannel],
  content: [validateContent, validateChannelRules],
  variables: [validateVariables],
}

export function useTemplateValidation() {
  function validateField(
    field: ValidationField,
    template: TemplateForm,
  ): ValidationResult {
    const errors = (fieldRules[field] ?? []).flatMap((rule) => rule(template))

    return createValidationResult(errors)
  }

  function validateTemplate(template: TemplateForm): ValidationResult {
    const errors: ValidationError[] = [
      ...validateField('templateName', template).errors,
      ...validateField('channel', template).errors,
      ...validateField('content', template).errors,
      ...validateField('variables', template).errors,
    ]

    return createValidationResult(errors)
  }

  return {
    validateField,
    validateTemplate,
  }
}
