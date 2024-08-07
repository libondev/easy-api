<script lang="ts" setup>
import { h } from 'vue'
import type { RequestDetails } from '@/types/request'

const requestDetails = inject('requestDetails', { value: {} }) as Ref<RequestDetails>
const ConfTable = defineAsyncComponent(() => import('./ConfTable.vue'))

const BODY_TYPE = [
  'Text',
  'JSON',
  // 'FormData',
  // 'GraphQL',
]

const configRenderComponent = computed(() => {
  const { bodyType } = requestDetails.value

  if (bodyType === 'JSON') {
    return h(ConfTable, {
      dataTypes: ['string', 'number', 'boolean', 'array', 'object', 'file'],
      modelValue: requestDetails.value.body,
    })
  }

  return h('textarea', {
    value: requestDetails.value.body,
    name: 'request-body',
    class: 'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    onInput: (ev: InputEvent) => {
      requestDetails.value.body = (ev.target as HTMLTextAreaElement).value
    },
  })
})

function toggleRequestBodyDataType(type: string) {
  if (type === 'JSON') {
    requestDetails.value.body = []
  } else if (type === 'Text') {
    requestDetails.value.body = ''
  }
}

toggleRequestBodyDataType(requestDetails.value.bodyType!)
</script>

<template>
  <div class="flex gap-4">
    <RadioGroup
      v-model="requestDetails.bodyType"
      :default-value="BODY_TYPE[0]"
      class="flex-col pt-4 w-24 min-w-24"
      @update:model-value="toggleRequestBodyDataType"
    >
      <div v-for="type of BODY_TYPE" :key="type" class="flex items-center gap-x-1">
        <RadioGroupItem :id="type" :value="type" />
        <Label :for="type" class="cursor-pointer">{{ type }}</Label>
      </div>
    </RadioGroup>

    <Component :is="configRenderComponent" />
  </div>
</template>
