<route>
  meta:
    title: Dashboard
</route>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { SplitterPanel } from 'radix-vue'
import Operate from './components/Operate.vue'
import Sidebar from './components/Sidebar.vue'
import Preview from './components/Preview.vue'

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
import type {
  RequestConfigures,
} from '@/constants/request'
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  getCurrentRequest,
  getLocaleHeaders,
  setCurrentRequest,
} from '@/constants/request'

import type { RequestDetail, RequestStatus } from '@/types/request'
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

const requestDetails = ref({} as RequestDetail)

const requestResult = shallowRef('')
const requestStatus = shallowRef({} as RequestStatus)
const requestPending = shallowRef(false)

let _startAt: number
let _abortController: AbortController

function onSendRequest() {
  const requestUrl = formatRequestAddress(requestDetails.value.url?.trim())

  if (!requestUrl || requestPending.value) {
    return
  }

  _startAt = Date.now()
  _abortController = new AbortController()
  requestPending.value = true

  const _queryString = getQueryStringFromObject(formatRequestOptions(requestDetails.value.queries))

  setCurrentRequest(toRaw(requestDetails.value))

  fetch(requestUrl + _queryString, {
    ...requestConfigs.value,
    body: requestDetails.value.body,
    signal: _abortController.signal,
    method: requestDetails.value.method,
    headers: formatRequestOptions(requestDetails.value.headers),
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

// merge common headers
function updateRequestHeaders(currentHeaders: RequestConfigures, commonHeaders: RequestConfigures) {
  console.info('🎡dashboard/index.vue:120/[currentHeaders, commonHeaders]:\n ', currentHeaders, commonHeaders)
  // todo
}

onMounted(async () => {
  // get basic config
  requestDetails.value = await getCurrentRequest()

  // merge current headers and common headers
  updateRequestHeaders(requestDetails.value.headers ?? [], await getLocaleHeaders())
})

onBeforeUnmount(() => {
  onCancelRequest()
  setCurrentRequest(requestDetails.value)
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
          v-model:detail="requestDetails"
          :pending="requestPending"
          @submit="onSendRequest"
          @cancel="onCancelRequest"
        />

        <Configure
          v-model:body="requestDetails.body"
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
          :result="requestResult"
          :status="requestStatus"
        />
      </SplitterPanel>
    </ResizablePanelGroup>
  </div>
</template>
