<script lang="ts" setup>
import { METHODS } from '@/constants/request'
import type { RequestDetail, RequestResult, RequestStatus } from '@/types/request'

const requestPending = defineModel<boolean>('pending', { default: false })
const requestStatus = defineModel('status', { default: {} as RequestStatus })
const requestDetail = defineModel('detail', { default: {} as RequestDetail })
const requestResult = defineModel('result', { default: {} as RequestResult })

const selectedMethod = shallowRef('get')

let startAt: number
function onSendClick() {
  if (!requestDetail.value.url) {
    return
  }

  startAt = Date.now()
  requestPending.value = true
  fetch(requestDetail.value.url, {
    mode: 'cors',
    cache: 'no-cache',
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

      requestResult.value = await res.json()
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

    <Input v-model.trim="requestDetail.url" name="request-address" @keydown.enter="onSendClick" />

    <Button class="px-3" :disabled="requestPending" @click="onSendClick">
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
