<script lang="ts" setup>
import localforage from 'localforage'
import Header from './components/Header.vue'
import { Toaster } from '@/components/ui/toast'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getDefaultRequestConfig,
} from '@/constants/request'
import type { DefaultConfig } from '@/constants/request'

const basicRequestConfig = ref(getDefaultRequestConfig())

provide(DEFAULT_REQUEST_CONFIG_INJECTION_KEY, basicRequestConfig)

localforage.getItem<DefaultConfig>(DEFAULT_REQUEST_CONFIG_INJECTION_KEY as unknown as string).then((res) => {
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
