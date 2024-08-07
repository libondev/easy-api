<script lang="ts" setup>
import Menus from './Menus.vue'
// import Profiler from './Profiler.vue'
import Document from './Document.vue'
import ToggleMode from './ToggleMode.vue'
import { buttonVariants } from '@/components/ui/button/index.ts'
</script>

<template>
  <div class="fixed top-0 w-full flex items-center p-2 pr-4 bg-background border-b">
    <div class="flex items-center flex-1">
      <!-- <Profiler /> -->
      <Menus />
    </div>

    <div class="space-x-1.5">
      <ToggleMode />

      <Document />

      <a href="https://github.com/libondev/eazy-api" target="_blank" :class="buttonVariants({ variant: 'ghost', size: 'icon' })">
        <i class="i-carbon-logo-github text-lg" />
      </a>
    </div>
  </div>
</template>
