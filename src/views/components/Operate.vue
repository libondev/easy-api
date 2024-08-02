<script lang="ts" setup>
import Address from './Address.vue'
import { DEFAULT_REQUEST_CONFIG_INJECTION_KEY, METHODS } from '@/constants/request'
import type { RequestDetail, RequestResult, RequestStatus } from '@/types/request'

const defaultConfig = inject(DEFAULT_REQUEST_CONFIG_INJECTION_KEY)!

const requestPending = defineModel<boolean>('pending', { default: false })
const requestDetail = defineModel('detail', { default: {} as RequestDetail })
const requestStatus = defineModel('status', { default: {} as RequestStatus })
const requestResult = defineModel<RequestResult>('result')

let _abortController: AbortController

function formatRequestUrl(url: string) {
  return url.replace(/#\{.*?value:(.*?)\}/g, '$1')
}

let startAt: number
function onSendClick() {
  if (!requestDetail.value.url) {
    return
  }

  startAt = Date.now()
  requestPending.value = true
  _abortController = new AbortController()

  fetch(formatRequestUrl(requestDetail.value.url), {
    ...defaultConfig.value,
    signal: _abortController.signal,
    method: requestDetail.value?.method,
    headers: requestDetail.value?.headers,
  } as RequestInit)
    .then(async (res) => {
      requestStatus.value = {
        code: res.status,
        durations: Date.now() - startAt,
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
        durations: Date.now() - startAt,
      }

      requestResult.value = err
    })
    .finally(() => {
      requestPending.value = false
    })
}

// Cancel requesting
function onCancelClick() {
  _abortController?.abort()
  requestPending.value = false
}

function onShareClick() { }

onBeforeUnmount(() => {
  onCancelClick()
})
</script>

<template>
  <div class="relative p-2 flex gap-1.5 items-center border-b">
    <Select v-model="requestDetail.method" name="request-method" default-value="GET">
      <SelectTrigger aria-label="Select method" class="w-24 min-w-24" :disabled="requestPending">
        <SelectValue placeholder="Select an method" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="method of METHODS" :key="method" :label="method" :value="method" />
      </SelectContent>
    </Select>

    <Address
      v-model.trim="requestDetail.url"
      :class="requestPending ? 'opacity-50' : ''"
      @submit="onSendClick"
    />

    <Button
      v-show="requestPending"
      variant="destructive"
      class="w-[72px] min-w-[72px]"
      title="Cancel this pending request"
      @click="onCancelClick"
    >
      Cancel
    </Button>
    <Button
      v-show="!requestPending"
      class="w-[72px] min-w-[72px]"
      title="Send this request"
      @click="onSendClick"
    >
      Send
    </Button>

    <Button
      class="px-3"
      variant="outline"
      title="Generate links to share with others"
      @click="onShareClick"
    >
      Share
    </Button>
  </div>

  <div class="p-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt maiores eos animi, consectetur placeat hic expedita explicabo nobis ipsa optio magnam voluptas impedit nulla asperiores non. Suscipit, temporibus id?
  </div>
</template>
