<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import Operate from './components/Operate.vue'
import Preview from './components/Preview.vue'
import Sidebar from './components/Sidebar.vue'
import { ResizablePanel } from '@/components/ui/resizable'
import {
  PREVIEW_PANEL_POSITION_DEFAULT_VALUE,
  PREVIEW_PANEL_POSITION_KEY,
  // SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE,
  // SIDEBAR_PANEL_VISIBLE_KEY,
} from '@/constants/layout'

import type { RequestStatus } from '@/types/request'
import type { PanelDirection/* , SidebarVisible */ } from '@/types/layout'

// const toggleSidebarVisibility = useStorage<SidebarVisible>(
//   SIDEBAR_PANEL_VISIBLE_KEY,
//   SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE,
// )

// const {
//   visible,
//   render,
//   open: setSidebarRender,
//   close: setSidebarHidden,
// } = useLazyShow(toggleSidebarVisibility.value === SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE)

const panelDirection = useStorage<PanelDirection>(
  PREVIEW_PANEL_POSITION_KEY,
  PREVIEW_PANEL_POSITION_DEFAULT_VALUE,
)

const requestPending = shallowRef(false)
const requestDetail = ref({
  url: '#{name:EXAMPLE,id:https://jsonplaceholder.typicode.com}/todos/1',
})
const requestStatus = shallowRef({} as RequestStatus)
const requestResult = shallowRef('')
</script>

<template>
  <div class="flex flex-1 h-full">
    <Sidebar />

    <ResizablePanelGroup :direction="panelDirection">
      <ResizablePanel
        :min-size="50"
        :default-size="60"
      >
        <Operate
          v-model:detail="requestDetail"
          v-model:result="requestResult"
          v-model:status="requestStatus"
          v-model:pending="requestPending"
        />
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel
        collapsible
        :min-size="25"
        :default-size="40"
      >
        <Preview
          v-model:direction="panelDirection"
          :result="requestResult"
          :status="requestStatus"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
