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

import {
  formatRequestAddress,
  formatRequestBody,
  formatRequestOptions,
  transformToQueryString,
} from './utils/format'
import {
  PREVIEW_PANEL_POSITION_DEFAULT_VALUE,
  PREVIEW_PANEL_POSITION_KEY,
  // SIDEBAR_PANEL_VISIBLE_DEFAULT_VALUE,
  // SIDEBAR_PANEL_VISIBLE_KEY,
} from '@/constants/layout'
import type {
  RequestConfigure,
  RequestConfigures,
  RequestDetails,
  RequestResults,
} from '@/types/request'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getCurrentRequest,
  getLocaleHeaders,
  setCurrentRequest,
} from '@/constants/request'

import type { PanelDirection/* , SidebarVisible */ } from '@/types/layout'

const Configure = defineAsyncComponent(() => import('./components/Configure.vue'))

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

let _startAt: number
let _abortController: AbortController

function onSendRequest() {
  const { url, headers, queries, method, body, bodyType } = requestDetails.value
  const requestUrl = formatRequestAddress(url?.trim())

  if (!requestUrl || requestPending.value) {
    return
  }

  setCurrentRequest(requestDetails.value)

  requestPending.value = true
  _abortController = new AbortController()

  const formattedBody = formatRequestBody(body, bodyType)
  const formattedHeaders = formatRequestOptions(headers)
  const queryString = transformToQueryString(formatRequestOptions(queries))

  _startAt = Date.now()
  fetch(requestUrl + queryString, {
    ...requestConfigs.value,
    method,
    body: formattedBody,
    signal: _abortController.signal,
    headers: formattedHeaders,
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

// merge common headers
function updateRequestHeaders(currentHeaders: RequestConfigures, commonHeaders: RequestConfigures) {
  // eslint-disable-next-line no-sequences
  const currentHeadersMap = currentHeaders.reduce((map, cur) => (map[cur.key] = cur, map), {} as Record<string, RequestConfigure>)

  const headers: RequestConfigures = [...currentHeaders]

  if (commonHeaders.length === 0) {
    return headers
  }

  if (currentHeaders.length === 0) {
    headers.push(...commonHeaders)
  } else {
    commonHeaders.forEach((h) => {
      // Attach public, but do not enable.
      if (!currentHeadersMap[h.key]) {
        headers.push({
          ...h,
          enable: false,
        })
      }
    })
  }

  return headers
}

provide('requestDetails', requestDetails)

onMounted(async () => {
  // get basic config
  const currentRequest = await getCurrentRequest()

  // merge current headers and common headers
  currentRequest.headers = updateRequestHeaders(
    currentRequest.headers ?? [],
    // Non-enabled public headers are not added to the list.
    (await getLocaleHeaders()).filter(h => h.enable),
  )

  requestDetails.value = currentRequest
})

onBeforeUnmount(() => {
  setCurrentRequest(requestDetails.value)
  onCancelRequest()
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
