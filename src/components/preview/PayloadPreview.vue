<script setup lang="ts">
import { computed } from 'vue'
import { Card, Empty } from 'ant-design-vue'

import type { TemplatePayload } from '@/types/template'

interface Props {
  payload: TemplatePayload | null
}

const props = defineProps<Props>()

const formattedPayload = computed(() => {
  if (!props.payload) {
    return ''
  }

  return JSON.stringify(props.payload, null, 2)
})
</script>

<template>
  <Card class="payload-preview" title="Payload JSON">
    <Empty
      v-if="!props.payload"
      description="Submit a valid template to generate the payload."
    />

    <pre v-else class="payload-preview__json">{{ formattedPayload }}</pre>
  </Card>
</template>

<style scoped>
.payload-preview {
  width: 100%;
  min-width: 0;
}

.payload-preview__json {
  max-width: 100%;
  max-height: 320px;
  margin: 0;
  padding: 16px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #111827;
  color: #f9fafb;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
