<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

import AppHeader from '@/components/layout/AppHeader.vue'

const theme = {
  token: {
    colorPrimary: '#2f766f',
    colorInfo: '#78cfc9',
    colorSuccess: '#95cdb2',
    colorWarning: '#e8c4a9',
    colorError: '#d96992',
    colorText: '#4b5563',
    colorTextHeading: '#374151',
    colorTextSecondary: '#7b8794',
    colorBorder: '#d9e6df',
    colorBgLayout: '#fbfaf7',
    colorBgContainer: '#ffffff',
    borderRadius: 8,
    boxShadowTertiary: '0 10px 28px rgb(80 104 112 / 10%)',
  },
  components: {
    Button: {
      primaryShadow: '0 8px 18px rgb(47 118 111 / 24%)',
    },
    Card: {
      headerBg: '#fbfaf7',
    },
    Input: {
      activeBorderColor: '#78cfc9',
      hoverBorderColor: '#a8ddd8',
    },
  },
}
</script>

<template>
  <ConfigProvider :theme="theme">
    <AppHeader />
    <RouterView />
  </ConfigProvider>
</template>
