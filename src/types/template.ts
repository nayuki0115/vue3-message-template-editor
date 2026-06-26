import type { VariableKey } from './variable'

export type Channel = 'LINE' | 'WhatsApp' | 'Messenger'

export type Language = 'zh-TW' | 'en' | 'ja'

export interface TemplateForm {
  templateName: string
  channel: Channel | null
  language: Language
  title: string
  content: string
}

export interface TemplatePayload {
  templateName: string
  channel: Channel
  language: Language
  title: string
  content: string
  variables: VariableKey[]
  submittedAt: string
}
