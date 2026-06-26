import type { Channel, Language } from '../types/template'

interface TemplateOption<TValue extends string> {
  label: string
  value: TValue
}

export const channelOptions = [
  {
    label: 'LINE',
    value: 'LINE',
  },
  {
    label: 'WhatsApp',
    value: 'WhatsApp',
  },
  {
    label: 'Messenger',
    value: 'Messenger',
  },
] as const satisfies readonly TemplateOption<Channel>[]

export const languageOptions = [
  {
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: '日本語',
    value: 'ja',
  },
] as const satisfies readonly TemplateOption<Language>[]
