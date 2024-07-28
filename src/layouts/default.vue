<script lang="ts" setup>
import localforage from 'localforage'
import Header from './components/Header.vue'
import { Toaster } from '@/components/ui/toast'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  type DefaultConfig,
  getDefaultRequestConfig,
} from '@/constants/request'

const basicRequestConfig = ref(getDefaultRequestConfig())

provide(DEFAULT_REQUEST_CONFIG_INJECTION_KEY, basicRequestConfig)

onMounted(async () => {
  const res = await localforage.getItem<DefaultConfig>('default-config')

  if (res) {
    basicRequestConfig.value = res
  }
})
</script>

<template>
  <Header />

  <RouterView />

  <Toaster />
</template>
