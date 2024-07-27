<script lang="ts" setup>
import { METHODS } from '@/constants/request'
import type { RequestDetail, RequestResult, RequestStatus } from '@/types/request'

const requestPending = defineModel<boolean>('pending', { default: false })
const requestStatus = defineModel('status', { default: {} as RequestStatus })
const requestDetail = defineModel('detail', { default: {} as RequestDetail })
const requestResult = defineModel<RequestResult>('result')

const selectedMethod = shallowRef('get')

let _abortController: AbortController

let startAt: number
function onSendClick() {
  if (!requestDetail.value.url) {
    return
  }

  startAt = Date.now()
  requestPending.value = true
  _abortController = new AbortController()

  fetch(requestDetail.value.url, {
    mode: 'cors',
    cache: 'no-cache',
    signal: _abortController.signal,
    credentials: 'include',
    referrerPolicy: 'no-referrer-when-downgrade',
    method: requestDetail.value?.method ?? 'GET',
    headers: requestDetail.value?.headers ?? {},
  })
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
</script>

<template>
  <div class="p-2 flex gap-1.5 items-center border-b">
    <Select v-model="requestDetail.method" name="request-method">
      <SelectTrigger aria-label="Select method" class="w-24 min-w-24">
        <SelectValue placeholder="Select an method" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="method of METHODS" :key="method" :label="method" :value="method" />
      </SelectContent>
    </Select>

    <Select v-model="selectedMethod" name="request-variable">
      <SelectTrigger aria-label="Select variable" class="w-24 min-w-24">
        <SelectValue placeholder="Select an Variable" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="method of METHODS" :key="method" :label="method" :value="method" />
      </SelectContent>
    </Select>

    <div class="w-full relative">
      <Input v-model.trim="requestDetail.url" name="request-address" class="pr-10" @keydown.enter="onSendClick" />
      <!-- TODO: support keyboard access -->
      <kbd class="inline-flex items-center pointer-events-none h-5 select-none items-center gap-1 rounded border border-border bg-muted font-sans font-medium min-h-5 text-[11px] h-5 px-1 pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"><span class="text-xs">⌘</span>K</kbd>
    </div>

    <Button v-show="requestPending" variant="destructive" class="w-[72px] min-w-[72px]" @click="onCancelClick">
      Cancel
    </Button>
    <Button v-show="!requestPending" class="w-[72px] min-w-[72px]" @click="onSendClick">
      Send
    </Button>

    <Button class="px-3" variant="outline" @click="onShareClick">
      Share
    </Button>
  </div>

  <div class="p-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt maiores eos animi, consectetur placeat hic expedita explicabo nobis ipsa optio magnam voluptas impedit nulla asperiores non. Suscipit, temporibus id?
  </div>
</template>
