import { computed } from 'vue'

import { replaceVariables } from '../utils/variableParser'

import type { Ref } from 'vue'

export const emptyPreviewMessage = 'Your message preview will appear here.'

export function useVariablePreview(content: Ref<string>) {
  const previewContent = computed(() => {
    if (content.value.trim().length === 0) {
      return emptyPreviewMessage
    }

    return replaceVariables(content.value)
  })

  return {
    previewContent,
  }
}
