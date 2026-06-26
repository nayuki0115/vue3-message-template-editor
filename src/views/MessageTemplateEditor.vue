<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { Button } from 'ant-design-vue'

import ValidationAlert from '@/components/feedback/ValidationAlert.vue'
import MessageContentEditor from '@/components/form/MessageContentEditor.vue'
import TemplateBasicForm from '@/components/form/TemplateBasicForm.vue'
import MessagePreviewCard from '@/components/preview/MessagePreviewCard.vue'
import PayloadPreview from '@/components/preview/PayloadPreview.vue'
import { useTemplateForm } from '@/composables/useTemplateForm'
import { useVariablePreview } from '@/composables/useVariablePreview'

import type { ValidationError } from '@/types/validation'

const {
  form,
  validationErrors,
  submittedPayload,
  handleBlur,
  insertVariable,
  submit,
} = useTemplateForm()
const { previewContent } = useVariablePreview(toRef(form, 'content'))
const hasSubmitted = ref(false)
const submitAttemptId = ref(0)

const alertErrors = computed<ValidationError[]>(() => [
  ...(validationErrors.templateName ?? []),
  ...(validationErrors.channel ?? []),
  ...(validationErrors.content ?? []),
  ...(validationErrors.variables ?? []),
])

function handleSubmit(): void {
  hasSubmitted.value = true
  submitAttemptId.value += 1
  submit()
}
</script>

<template>
  <main class="message-template-editor">
    <ValidationAlert
      v-if="hasSubmitted"
      :key="submitAttemptId"
      :errors="alertErrors"
    />

    <div class="message-template-editor__layout">
      <section class="message-template-editor__panel">
        <TemplateBasicForm
          v-model:template-name="form.templateName"
          v-model:channel="form.channel"
          v-model:language="form.language"
          v-model:title="form.title"
          :errors="{
            templateName: validationErrors.templateName,
            channel: validationErrors.channel,
          }"
          @blur="handleBlur"
        />

        <MessageContentEditor
          v-model:content="form.content"
          :content-errors="validationErrors.content"
          :variable-errors="validationErrors.variables"
          @blur="handleBlur('content')"
          @insert-variable="
            insertVariable($event.variableTemplate, {
              start: $event.start,
              end: $event.end,
            })
          "
        />

        <div class="message-template-editor__actions">
          <Button type="primary" @click="handleSubmit">Submit template</Button>
        </div>
      </section>

      <aside class="message-template-editor__preview">
        <MessagePreviewCard :title="form.title" :content="previewContent" />
        <PayloadPreview :payload="submittedPayload" />
      </aside>
    </div>
  </main>
</template>

<style scoped>
.message-template-editor {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 32px 24px;
  display: grid;
  gap: 24px;
}

.message-template-editor__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  align-items: start;
  gap: 24px;
}

.message-template-editor__panel {
  display: grid;
  gap: 24px;
}

.message-template-editor__preview {
  display: grid;
  gap: 24px;
}

.message-template-editor__actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .message-template-editor {
    padding: 24px 16px;
  }

  .message-template-editor__layout {
    grid-template-columns: 1fr;
  }

  .message-template-editor__actions {
    justify-content: stretch;
  }

  .message-template-editor__actions :deep(.ant-btn) {
    width: 100%;
  }
}
</style>
