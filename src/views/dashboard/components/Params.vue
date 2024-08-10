<script lang="ts" setup>
import { h } from 'vue'
import {
  getDataTypeColumn,
  getEnableColumn,
  getOperateColumn,
  getPrimaryKeyColumn,
  getRowValueColumn,
  normalDataTypes,
  onCreateClick,
  onRemoveClick,
} from '../utils/columns.ts'
import { Table } from '@/components/ui/table'

import type { RequestDetails } from '@/types/request.ts'

const requestDetails = inject('requestDetails', { value: { } }) as Ref<RequestDetails>

const BODY_TYPE = [
  'Text',
  'JSON',
  'FormData',
  // 'GraphQL',
]

const tableColumns = [
  getPrimaryKeyColumn(),
  getDataTypeColumn([...normalDataTypes, 'file']),
  getRowValueColumn(),
]

const componentRenderer = computed(() => {
  const { bodyType = 'Text' } = requestDetails.value

  if (['JSON', 'FormData'].includes(bodyType)) {
    return h(Table, {
      index: false,
      filterable: false,
      data: requestDetails.value.body,
      columns: [
        getEnableColumn(requestDetails.value.body),
        ...tableColumns,
        getOperateColumn(
          onCreateClick(requestDetails.value.body),
          onRemoveClick(requestDetails.value.body),
        ),
      ],
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

// Allow rollback to the last data
let _backupPrevBodyParams: any
let _isManualSwitching = false

// change "bodyType" reset "body"
watch(() => requestDetails.value.bodyType, (newType = 'Text', oldType) => {
  // The first change may be due to reading from cache.
  if (!oldType || !_isManualSwitching) {
    return
  }

  // Do compatible data structures need to be reset?
  if (
    (newType === 'JSON' && oldType === 'FormData') ||
    (newType === 'FormData' && oldType === 'JSON')
  ) {
    return
  }

  const isBodyNonEmpty = requestDetails.value.body?.length > 0

  if (isBodyNonEmpty) {
    _backupPrevBodyParams = requestDetails.value.body

    useToast.info('Request body has been reset due to data type switching.', {
      action: {
        label: 'Undo',
        onClick: () => {
          _isManualSwitching = false
          requestDetails.value.bodyType = oldType
          requestDetails.value.body = _backupPrevBodyParams
        },
      },
    })
  }

  if (['JSON', 'FormData'].includes(newType)) {
    requestDetails.value.body = []
  } else if (newType === 'Text') {
    requestDetails.value.body = ''
  }
})

// manual switching "bodyType"
function onManualSwitching() {
  _isManualSwitching = true
}
</script>

<template>
  <div class="flex gap-4">
    <RadioGroup
      v-model="requestDetails.bodyType"
      :default-value="BODY_TYPE[0]"
      class="flex-col pt-4 w-24 min-w-24"
      @update:model-value="onManualSwitching"
    >
      <div v-for="type of BODY_TYPE" :key="type" class="flex items-center gap-x-1">
        <RadioGroupItem :id="type" :value="type" />
        <Label :for="type" class="cursor-pointer">{{ type }}</Label>
      </div>
    </RadioGroup>

    <Component :is="componentRenderer" />
  </div>
</template>
