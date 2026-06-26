<script setup lang="ts">
import { computed } from 'vue'
import { Button } from 'ant-design-vue'

import ValidationAlert from '@/components/feedback/ValidationAlert.vue'
import MessageContentEditor from '@/components/form/MessageContentEditor.vue'
import TemplateBasicForm from '@/components/form/TemplateBasicForm.vue'
import { useTemplateForm } from '@/composables/useTemplateForm'

import type { ValidationError } from '@/types/validation'

const { form, validationErrors, handleBlur, insertVariable, submit } =
  useTemplateForm()

const alertErrors = computed<ValidationError[]>(() => [
  ...(validationErrors.templateName ?? []),
  ...(validationErrors.channel ?? []),
  ...(validationErrors.content ?? []),
  ...(validationErrors.variables ?? []),
])
</script>

<template>
  <main class="message-template-editor">
    <section class="message-template-editor__panel">
      <ValidationAlert :errors="alertErrors" />

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
        <Button type="primary" @click="submit">Submit template</Button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.message-template-editor {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 32px 24px;
}

.message-template-editor__panel {
  display: grid;
  gap: 24px;
  max-width: 760px;
}

.message-template-editor__actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .message-template-editor {
    padding: 24px 16px;
  }

  .message-template-editor__actions {
    justify-content: stretch;
  }

  .message-template-editor__actions :deep(.ant-btn) {
    width: 100%;
  }
}
</style>
