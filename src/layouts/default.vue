<script lang="ts" setup>
import Header from '@/components/layouts/Header.vue'
import { Toaster } from '@/components/ui/toast'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getLocaleDefaultConfig,
} from '@/constants/request'

const requestConfig = ref({})

provide(DEFAULT_REQUEST_CONFIG_INJECTION_KEY, requestConfig)

onMounted(async () => {
  requestConfig.value = await getLocaleDefaultConfig()
})
</script>

<template>
  <Header />

  <RouterView />

  <Toaster />
</template>
