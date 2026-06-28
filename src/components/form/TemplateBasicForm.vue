<script setup lang="ts">
import { Form, FormItem, Input, Select } from 'ant-design-vue'

import { channelOptions, languageOptions } from '@/constants/templateOptions'

import type { Channel, Language } from '@/types/template'
import type { ValidationError } from '@/types/validation'

interface FieldErrors {
  templateName?: ValidationError[]
  channel?: ValidationError[]
}

interface Props {
  templateName: string
  channel: Channel | null
  language: Language
  title: string
  errors?: FieldErrors
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => ({}),
})

const emit = defineEmits<{
  'update:templateName': [value: string]
  'update:channel': [value: Channel]
  'update:language': [value: Language]
  'update:title': [value: string]
  blur: [field: 'templateName' | 'channel' | 'language' | 'title']
}>()

const editableChannelOptions = [...channelOptions]
const editableLanguageOptions = [...languageOptions]

function getFieldHelp(errors: ValidationError[] | undefined): string {
  return errors?.map((error) => error.message).join(' ') ?? ''
}

function isChannel(value: unknown): value is Channel {
  return channelOptions.some((option) => option.value === value)
}

function isLanguage(value: unknown): value is Language {
  return languageOptions.some((option) => option.value === value)
}

function updateChannel(value: unknown): void {
  if (!isChannel(value)) {
    return
  }

  emit('update:channel', value)
}

function updateLanguage(value: unknown): void {
  if (!isLanguage(value)) {
    return
  }

  emit('update:language', value)
}
</script>

<template>
  <Form class="template-basic-form" layout="vertical">
    <FormItem
      label="Template name"
      :validate-status="props.errors.templateName?.length ? 'error' : undefined"
      :help="getFieldHelp(props.errors.templateName)"
      required
    >
      <Input
        :value="templateName"
        placeholder="Order update"
        @update:value="$emit('update:templateName', $event)"
        @blur="$emit('blur', 'templateName')"
      />
    </FormItem>

    <div class="template-basic-form__row">
      <FormItem
        label="Channel"
        :validate-status="props.errors.channel?.length ? 'error' : undefined"
        :help="getFieldHelp(props.errors.channel)"
        required
      >
        <Select
          :value="channel ?? undefined"
          :options="editableChannelOptions"
          placeholder="Select channel"
          @update:value="updateChannel"
          @blur="$emit('blur', 'channel')"
        />
      </FormItem>

      <FormItem label="Language">
        <Select
          :value="language"
          :options="editableLanguageOptions"
          @update:value="updateLanguage"
          @blur="$emit('blur', 'language')"
        />
      </FormItem>
    </div>

    <FormItem label="Title">
      <Input
        :value="title"
        placeholder="Optional message title"
        @update:value="$emit('update:title', $event)"
        @blur="$emit('blur', 'title')"
      />
    </FormItem>
  </Form>
</template>

<style scoped>
.template-basic-form {
  width: 100%;
  min-width: 0;
}

.template-basic-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  min-width: 0;
}

@media (max-width: 640px) {
  .template-basic-form__row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
