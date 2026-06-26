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
}
</style>
