import { createRouter, createWebHistory } from 'vue-router'

import MessageTemplateEditor from '../views/MessageTemplateEditor.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'message-template-editor',
      component: MessageTemplateEditor,
    },
  ],
})
