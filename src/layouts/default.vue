<script lang="ts" setup>
import Header from '@/components/layouts/Header.vue'
import { Toaster } from '@/components/ui/toast'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getLocaleDefaultConfigs,
} from '@/constants/request.ts'

const requestConfig = ref({})

provide(DEFAULT_REQUEST_CONFIG_INJECTION_KEY, requestConfig)

onMounted(async () => {
  requestConfig.value = await getLocaleDefaultConfigs()
})
</script>

<template>
  <TooltipProvider>
    <Header />

    <RouterView />
  </TooltipProvider>

  <Toaster />
</template>
