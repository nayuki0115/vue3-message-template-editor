export type ValidationErrorType =
  | 'required'
  | 'invalidSelection'
  | 'invalidTemplateSyntax'
  | 'unknownVariable'
  | 'channelConstraint'

export type ValidationField =
  | 'templateName'
  | 'channel'
  | 'language'
  | 'title'
  | 'content'
  | 'variables'

export interface ValidationError {
  field: ValidationField
  type: ValidationErrorType
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}
