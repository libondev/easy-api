<script lang="ts" setup>
import Address from './Address.vue'

import { REQUEST_METHODS } from '@/constants/request.ts'
import type { RequestDetails } from '@/types/request.ts'

const emits = defineEmits<{
  share: []
  submit: []
  cancel: []
}>()

const requestPending = defineModel<boolean>('pending', { default: false })
const requestDetail = defineModel('detail', { default: {} as RequestDetails })

function onSendClick() {
  emits('submit')
}

function onCancelClick() {
  emits('cancel')
}
</script>

<template>
  <div class="relative p-2 flex gap-1.5 items-center border-b">
    <Select v-model="requestDetail.method" name="request-method" default-value="GET">
      <SelectTrigger aria-label="Select method" class="w-24 min-w-24" :disabled="requestPending">
        <SelectValue placeholder="Select an method" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="method of REQUEST_METHODS" :key="method" :label="method" :value="method" />
      </SelectContent>
    </Select>

    <div class="flex-1 h-8 relative">
      <Address
        v-model="requestDetail.url"
        :class="requestPending ? 'opacity-50 pointer-events-none' : ''"
        class="absolute left-0 right-0 top-0"
        @submit="onSendClick"
      />
    </div>

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
  </div>
</template>
