<route>
  meta:
    title: Dashboard
</route>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { SplitterPanel } from 'radix-vue'
import Operate from './components/Operate.vue'
// import Sidebar from './components/Sidebar.vue'
import Preview from './components/Preview.vue'
import Configure from './components/Configure.vue'

import {
  formatRequestAddress,
  formatRequestBody,
  formatRequestOptions,
  transformToQueryString,
} from './utils/format.ts'
import {
  PREVIEW_PANEL_POSITION_DEFAULT_VALUE,
  PREVIEW_PANEL_POSITION_KEY,
  // SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE,
  // SIDEBAR_PANEL_VISIBLE_KEY,
} from '@/constants/layout.ts'
import type {
  RequestDetails,
  RequestResults,
} from '@/types/request.ts'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getCurrentRequest,
  getLocaleHeaders,
  setCurrentRequest,
} from '@/constants/request.ts'

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

const requestConfigs = inject(DEFAULT_REQUEST_CONFIG_INJECTION_KEY)!

const requestPending = shallowRef(false)
const requestDetails = ref({} as RequestDetails)
const requestResults = shallowRef({} as RequestResults)

provide('requestDetails', requestDetails)

let _startAt: number
let _abortController: AbortController

function onSendRequest() {
  const { url, headers, queries, method, body, bodyType } = requestDetails.value
  const requestUrl = formatRequestAddress(url?.trim())

  if (!requestUrl || requestPending.value) {
    return
  }

  requestPending.value = true
  _abortController = new AbortController()

  const formattedHeader = formatRequestOptions(headers)
  const formattedBody = formatRequestBody(body, method, bodyType)
  const queryString = transformToQueryString(formatRequestOptions(queries))

  _startAt = Date.now()
  fetch(requestUrl + queryString, {
    ...requestConfigs.value,
    method,
    body: formattedBody,
    headers: formattedHeader,
    signal: _abortController.signal,
  })
    .then(async (res) => {
      const durations = Date.now() - _startAt

      let response = await res.text()

      if (typeof response !== 'string') {
        response = JSON.stringify(response)
      }

      requestResults.value = {
        durations,
        text: response,
        code: res.status,
      }
    })
    .catch((err) => {
      requestResults.value = {
        text: err,
        code: err.status || 500,
        durations: Date.now() - _startAt,
      }
    })
    .finally(() => {
      requestPending.value = false
    })
}

function onCancelRequest() {
  _abortController?.abort()
  requestPending.value = false
}

let _autoSaveTimer: number
watch(() => requestDetails.value, (newVal, oldVal, onClear) => {
  // initial
  if (!oldVal?.url) {
    return
  }

  onClear(() => {
    clearTimeout(_autoSaveTimer)
    _autoSaveTimer = 0
  })

  _autoSaveTimer = window.setTimeout(setCurrentRequest, 2000, newVal)
}, { deep: true, flush: 'post' })

onMounted(async () => {
  // get basic config
  const currentRequest = await getCurrentRequest()

  // The default headers are applied only if the headers have not been set.
  if (!currentRequest.headers?.length) {
    currentRequest.headers = (await getLocaleHeaders()).filter(h => h.enable)
  }

  requestDetails.value = currentRequest
})

onBeforeUnmount(() => {
  onCancelRequest()

  // You don't need to save it again if "watch effect" is still executing.
  if (!_autoSaveTimer) {
    setCurrentRequest(requestDetails.value)
  }
})
</script>

<template>
  <div class="flex h-full">
    <!-- <Sidebar /> -->

    <ResizablePanelGroup :direction="panelDirection">
      <SplitterPanel
        :min-size="50"
        :default-size="60"
      >
        <Operate
          v-model:detail="requestDetails"
          :pending="requestPending"
          @submit="onSendRequest"
          @cancel="onCancelRequest"
        />

        <Configure
          v-model:headers="requestDetails.headers"
          v-model:queries="requestDetails.queries"
        />
      </SplitterPanel>

      <ResizableHandle with-handle />

      <SplitterPanel
        collapsible
        :min-size="25"
        :default-size="40"
      >
        <Preview
          v-model:direction="panelDirection"
          :result="requestResults"
          :pending="requestPending"
        />
      </SplitterPanel>
    </ResizablePanelGroup>
  </div>
</template>
