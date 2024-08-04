<route>
  meta:
    title: Dashboard
</route>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { SplitterPanel } from 'radix-vue'
import Operate from './components/Operate.vue'
import Preview from './components/Preview.vue'
import Sidebar from './components/Sidebar.vue'
import Parameters from './components/Parameters.vue'
import {
  formatRequestAddress,
  formatRequestOptions,
  getQueryStringFromObject,
} from './utils/format'
import {
  PREVIEW_PANEL_POSITION_DEFAULT_VALUE,
  PREVIEW_PANEL_POSITION_KEY,
  // SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE,
  // SIDEBAR_PANEL_VISIBLE_KEY,
} from '@/constants/layout'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getLocaleHeaders,
} from '@/constants/request'

import type { RequestHeaders } from '@/constants/request'
import type { RequestDetail, RequestStatus } from '@/types/request'
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

const requestConfig = inject(DEFAULT_REQUEST_CONFIG_INJECTION_KEY)!

const requestQueries = ref<RequestHeaders>([])
const requestHeader = ref<RequestHeaders>([])
const requestDetail = ref<RequestDetail>({
  url: '#{value:EXAMPLE,key:https://jsonplaceholder.typicode.com}/todos/1',
})
const requestStatus = shallowRef({} as RequestStatus)
const requestResult = shallowRef('')
const requestPending = shallowRef(false)

let _startAt: number
let _abortController: AbortController

function onSendRequest() {
  const requestUrl = formatRequestAddress(requestDetail.value.url?.trim())

  if (!requestUrl || requestPending.value) {
    return
  }

  _startAt = Date.now()
  _abortController = new AbortController()
  requestPending.value = true

  const _queryString = getQueryStringFromObject(formatRequestOptions(requestQueries.value))

  fetch(requestUrl + _queryString, {
    ...requestConfig.value,
    signal: _abortController.signal,
    method: requestDetail.value.method,
    headers: formatRequestOptions(requestHeader.value),
  })
    .then(async (res) => {
      requestStatus.value = {
        code: res.status,
        durations: Date.now() - _startAt,
      }

      let response = await res.text()

      if (typeof response !== 'string') {
        response = JSON.stringify(response)
      }

      requestResult.value = response
    })
    .catch((err) => {
      requestStatus.value = {
        code: err.status || 500,
        durations: Date.now() - _startAt,
      }

      requestResult.value = err
    })
    .finally(() => {
      requestPending.value = false
    })
}

function onCancelRequest() {
  _abortController?.abort()
  requestPending.value = false
}

onMounted(async () => {
  requestHeader.value = await getLocaleHeaders()
})

onBeforeUnmount(() => {
  onCancelRequest()
})
</script>

<template>
  <div class="flex flex-1 h-full">
    <Sidebar />

    <ResizablePanelGroup :direction="panelDirection">
      <SplitterPanel
        :min-size="50"
        :default-size="60"
      >
        <Operate
          v-model:detail="requestDetail"
          :pending="requestPending"
          @submit="onSendRequest"
          @cancel="onCancelRequest"
        />

        <Tabs default-value="header" class="p-2">
          <TabsList class="w-full">
            <TabsTrigger class="flex-1" value="header">
              Headers
            </TabsTrigger>
            <TabsTrigger class="flex-1" value="query">
              Query
            </TabsTrigger>
            <TabsTrigger class="flex-1" value="params">
              Params
            </TabsTrigger>
          </TabsList>

          <TabsContent value="header">
            <Parameters v-model="requestHeader" />
          </TabsContent>
          <TabsContent value="query">
            <Parameters v-model="requestQueries" />
          </TabsContent>
          <TabsContent value="params">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequatur architecto sit nihil voluptas perspiciatis facilis nisi cumque suscipit harum pariatur enim illum eveniet quas quia officiis, atque, deserunt saepe?
          </TabsContent>
        </Tabs>
      </SplitterPanel>

      <ResizableHandle with-handle />

      <SplitterPanel
        collapsible
        :min-size="25"
        :default-size="40"
      >
        <Preview
          v-model:direction="panelDirection"
          :result="requestResult"
          :status="requestStatus"
        />
      </SplitterPanel>
    </ResizablePanelGroup>
  </div>
</template>
