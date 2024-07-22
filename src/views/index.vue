<script lang="ts" setup>
import Preview from './components/Preview.vue'
import Operate from './components/Operate.vue'

import { ResizablePanel } from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel
      :min-size="50"
      :default-size="60"
    >
      <Operate />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel
      :min-size="25"
      :default-size="40"
    >
      <Preview />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
