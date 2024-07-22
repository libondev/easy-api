<script lang="ts" setup>
import Operate from './components/Operate.vue'
import Preview from './components/Preview.vue'
import type { RequestStatus } from '@/types/request.ts'

import { ResizablePanel } from '@/components/ui/resizable'

const requestPending = shallowRef(false)
const requestDetail = ref({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'GET',
})
const requestStatus = shallowRef({ code: 200, durations: 5 } as RequestStatus)
const requestResult = shallowRef({
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
})
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
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

    <ResizableHandle />

    <ResizablePanel
      :min-size="25"
      :default-size="40"
    >
      <Preview :result="requestResult" :status="requestStatus" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
