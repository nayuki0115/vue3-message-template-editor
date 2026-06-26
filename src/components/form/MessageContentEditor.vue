<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Form, FormItem, Textarea } from 'ant-design-vue'

import VariableToolbar from '@/components/form/VariableToolbar.vue'

import type { ValidationError } from '@/types/validation'

interface InsertVariablePayload {
  variableTemplate: string
  start: number
  end: number
}

interface Props {
  content: string
  contentErrors?: ValidationError[]
  variableErrors?: ValidationError[]
}

const props = withDefaults(defineProps<Props>(), {
  contentErrors: () => [],
  variableErrors: () => [],
})

const emit = defineEmits<{
  'update:content': [value: string]
  blur: []
  'insert-variable': [payload: InsertVariablePayload]
}>()

const textareaElement = ref<{
  focus: () => void
  setSelectionRange: (start: number, end: number) => void
} | null>(null)
const selectionStart = ref(0)
const selectionEnd = ref(0)

function getHelpText(errors: ValidationError[]): string {
  return errors.map((error) => error.message).join(' ')
}

function rememberSelection(event: { target: unknown }): void {
  const target = event.target

  if (!(target instanceof globalThis.HTMLTextAreaElement)) {
    return
  }

  textareaElement.value = target
  selectionStart.value = target.selectionStart
  selectionEnd.value = target.selectionEnd
}

async function handleInsertVariable(variableTemplate: string): Promise<void> {
  const hasRememberedTextarea = Boolean(textareaElement.value)
  const start = hasRememberedTextarea
    ? selectionStart.value
    : props.content.length
  const end = hasRememberedTextarea ? selectionEnd.value : props.content.length

  emit('insert-variable', {
    variableTemplate,
    start,
    end,
  })

  await nextTick()

  const cursorPosition = start + variableTemplate.length
  textareaElement.value?.focus()
  textareaElement.value?.setSelectionRange(cursorPosition, cursorPosition)
  selectionStart.value = cursorPosition
  selectionEnd.value = cursorPosition
}
</script>

<template>
  <section
    class="message-content-editor"
    aria-labelledby="message-content-heading"
  >
    <div class="message-content-editor__header">
      <h2 id="message-content-heading" class="message-content-editor__title">
        Message content
      </h2>
      <VariableToolbar @insert="handleInsertVariable" />
    </div>

    <Form layout="vertical">
      <FormItem
        label="Content"
        :validate-status="
          props.contentErrors.length || props.variableErrors.length
            ? 'error'
            : undefined
        "
        :help="getHelpText([...props.contentErrors, ...props.variableErrors])"
        required
      >
        <Textarea
          :value="content"
          :maxlength="500"
          :rows="10"
          show-count
          placeholder="Hi {{ customer_name }}, your order {{ order_id }} is ready."
          @update:value="$emit('update:content', $event)"
          @blur="$emit('blur')"
          @click="rememberSelection"
          @keyup="rememberSelection"
          @select="rememberSelection"
        />
      </FormItem>
    </Form>
  </section>
</template>

<style scoped>
.message-content-editor {
  display: grid;
  gap: 12px;
}

.message-content-editor__header {
  display: grid;
  gap: 8px;
}

.message-content-editor__title {
  margin: 0;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}
</style>
