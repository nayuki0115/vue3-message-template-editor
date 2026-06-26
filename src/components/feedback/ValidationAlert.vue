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
.validation-alert {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 20;
  width: min(420px, calc(100vw - 32px));
  box-shadow: 0 12px 32px rgb(17 24 39 / 14%);
}

.validation-alert__list {
  margin: 0;
  padding-left: 18px;
}

.validation-alert__list li + li {
  margin-top: 4px;
}

@media (max-width: 640px) {
  .validation-alert {
    top: 16px;
    right: 16px;
  }
}
</style>
