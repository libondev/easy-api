<script lang="ts" setup>
import { cleanAllLocaleCaches } from '@/constants/request.ts'

function onCleanClick() {
  cleanAllLocaleCaches()
  useToast.info('The cache has been reset. Please reload the page.', {
    action: {
      label: 'Reload',
      onClick: () => location.reload(),
    },
  })
}
</script>

<template>
  <Button variant="ghost" size="icon" title="Clean up all data caches" @click="onCleanClick">
    <i class="i-carbon-clean text-lg" />
  </Button>
</template>
