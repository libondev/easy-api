<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <div class="h-full flex">
    <Sidebar />

    <RouterView />
  </div>

  <Toaster />
</template>
