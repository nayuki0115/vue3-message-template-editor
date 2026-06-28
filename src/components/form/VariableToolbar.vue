<script setup lang="ts">
import { Button, Space, Tooltip } from 'ant-design-vue'

import { supportedVariables } from '@/constants/variables'

type SupportedVariable = (typeof supportedVariables)[number]

defineEmits<{
  insert: [variableTemplate: SupportedVariable['template']]
}>()
</script>

<template>
  <Space class="variable-toolbar" wrap>
    <Tooltip
      v-for="variable in supportedVariables"
      :key="variable.key"
      :title="`Insert ${variable.template}`"
    >
      <Button
        type="default"
        size="small"
        @click="$emit('insert', variable.template)"
      >
        {{ variable.variableName }}
      </Button>
    </Tooltip>
  </Space>
</template>

<style scoped>
.variable-toolbar {
  width: 100%;
  min-width: 0;
}

.variable-toolbar :deep(.ant-space-item) {
  max-width: 100%;
  min-width: 0;
}

.variable-toolbar :deep(.ant-btn) {
  max-width: 100%;
  height: auto;
  min-height: 24px;
  border-color: #c7e5df;
  background: #eff9f7;
  color: #40756f;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;
}

.variable-toolbar :deep(.ant-btn:hover),
.variable-toolbar :deep(.ant-btn:focus-visible) {
  border-color: #e7b7c8;
  background: #fff0f5;
  color: #9f4f6d;
}
</style>
