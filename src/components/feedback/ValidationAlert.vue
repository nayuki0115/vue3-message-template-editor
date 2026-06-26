<script setup lang="ts">
import { computed } from 'vue'
import { Alert } from 'ant-design-vue'

import type { ValidationError } from '@/types/validation'

interface Props {
  errors: ValidationError[]
}

const props = defineProps<Props>()

const alertKey = computed(() =>
  props.errors
    .map((error) => `${error.field}:${error.type}:${error.message}`)
    .join('|'),
)
</script>

<template>
  <Alert
    v-if="props.errors.length"
    :key="alertKey"
    class="validation-alert"
    type="error"
    message="Please fix the following issues"
    show-icon
    closable
  >
    <template #description>
      <ul class="validation-alert__list">
        <li
          v-for="(error, index) in props.errors"
          :key="`${error.field}-${error.type}-${index}`"
        >
          {{ error.message }}
        </li>
      </ul>
    </template>
  </Alert>
</template>

<style scoped>
.validation-alert__list {
  margin: 0;
  padding-left: 18px;
}

.validation-alert__list li + li {
  margin-top: 4px;
}
</style>
