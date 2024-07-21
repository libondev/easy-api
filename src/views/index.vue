<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
import Preview from './components/Preview.vue'
import Operate from './components/Operate.vue'

import { ResizablePanel } from '@/components/ui/resizable'

const isCollapsed = shallowRef(false)

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel
      id="resize-panel-sidebar"
      collapsible
      :min-size="15"
      :max-size="20"
      :default-size="18"
      :class="{ 'min-w-[56px] transition-all duration-300 ease-in-out': isCollapsed }"
      @expand="onExpand"
      @collapse="onCollapse"
    >
      <Sidebar :is-collapsed />
    </ResizablePanel>

    <ResizableHandle id="resize-handle-1" with-handle />

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
