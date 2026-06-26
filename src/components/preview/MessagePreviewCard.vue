<script setup lang="ts">
import { Card, Empty, TypographyText, TypographyTitle } from 'ant-design-vue'

interface Props {
  content: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<template>
  <Card class="message-preview-card" title="Message preview">
    <Empty
      v-if="props.content.trim().length === 0"
      description="Start typing message content to see the preview."
    />

    <article v-else class="message-preview-card__message">
      <TypographyTitle
        v-if="props.title.trim().length"
        class="message-preview-card__title"
        :level="5"
      >
        {{ props.title.trim() }}
      </TypographyTitle>

      <TypographyText class="message-preview-card__content">
        {{ props.content }}
      </TypographyText>
    </article>
  </Card>
</template>

<style scoped>
.message-preview-card {
  width: 100%;
}

.message-preview-card__message {
  display: grid;
  gap: 12px;
  min-height: 160px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.message-preview-card__title {
  margin: 0;
}

.message-preview-card__content {
  color: #1f2937;
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
