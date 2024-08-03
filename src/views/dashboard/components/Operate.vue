<script lang="ts" setup>
import Address from './Address.vue'

import { REQUEST_METHODS } from '@/constants/request'
import type { RequestDetail } from '@/types/request'

const emits = defineEmits<{
  share: []
  submit: []
  cancel: []
}>()

const requestPending = defineModel<boolean>('pending', { default: false })
const requestDetail = defineModel('detail', { default: {} as RequestDetail })

function onSendClick() {
  emits('submit')
}

function onCancelClick() {
  emits('cancel')
}

function onShareClick() {
  emits('share')
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

    <Address
      v-model="requestDetail.url"
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
</template>
