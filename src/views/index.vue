<script lang="ts" setup>
import Preview from './components/Preview.vue'
import Operate from './components/Operate.vue'

import { ResizablePanel } from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel
      :min-size="40"
      :default-size="45"
    >
      <Operate />
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel
      :min-size="25"
      :default-size="37"
    >
      <Preview />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
