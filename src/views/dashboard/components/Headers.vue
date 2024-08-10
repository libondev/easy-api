<script lang="tsx" setup>
import { unionBy } from 'es-toolkit'
import {
  getEnableColumn,
  getPrimaryKeyColumn,
  getRowValueColumn,
} from '../utils/columns'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card/index.ts'
import {
  DialogTrigger,
} from '@/components/ui/dialog/index.ts'
import { Button } from '@/components/ui/button/index.ts'
import { getLocaleHeaders } from '@/constants/request.ts'

import type { ITableColumn } from '@/components/ui/table/index.ts'
import type { RequestConfigures } from '@/types/request.ts'

defineOptions({
  inheritAttrs: false,
})

const configHeaders = ref<RequestConfigures>([])
const requestHeaders = defineModel<RequestConfigures>({ default: [] })

const getRowReadonly = (row: any) => ({ readonly: !row.isCustom })

const headerTableColumns = [
  getEnableColumn(requestHeaders),
  getPrimaryKeyColumn(getRowReadonly),
  getRowValueColumn(getRowReadonly),
  getOperateColumn(),
]

const configHeadersTableColumns = [
  getEnableColumn(configHeaders),
  getPrimaryKeyColumn(getRowReadonly),
  getRowValueColumn(getRowReadonly),
]

function onCreateClick() {
  requestHeaders.value.push({
    id: `${Date.now()}`,
    key: '',
    value: '',
    enable: true,
  })
}

function onRemoveClick(idx: number) {
  requestHeaders.value.splice(idx, 1)
}

function getOperateColumn(): ITableColumn {
  return {
    title: '',
    field: 'operate',
    width: 50,
    headClass: 'text-center',
    cellClass: 'text-center',

    renderHead: () => (
      <HoverCard open-delay={200}>
        <HoverCardTrigger>
          <Button variant="outline" class="size-7 p-1" onClick={onCreateClick}>
            <i class="i-ph-plus-bold" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent class="p-1 w-max" side="bottom" align="end" alignOffset={-4} sideOffset={8}>
          <DialogTrigger as-child>
            <Button variant="outline" class="h-7 p-1 text-xs">
              <i class="i-carbon-select-window mr-1" />
              Select headers
            </Button>
          </DialogTrigger>
        </HoverCardContent>
      </HoverCard>
    ),

    renderCell: ({ idx }) => (
      <Button variant="destructive" class="size-7 p-1" onClick={() => onRemoveClick(idx)}>
        <i class="i-carbon-trash-can" />
      </Button>
    ),
  }
}

function onConfirmClick() {
  const checkedHeaders = configHeaders.value.filter(header => header.enable)
  requestHeaders.value = unionBy(requestHeaders.value, checkedHeaders, obj => obj.id)
}

onMounted(async () => {
  configHeaders.value = (await getLocaleHeaders()).map((item) => {
    item.enable = false
    return item
  })
})
</script>

<template>
  <Dialog>
    <Table :index="false" :filterable="false" :data="requestHeaders" :columns="headerTableColumns" />

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select existing headers</DialogTitle>
        <DialogDescription>
          You can add the pre-configured header to the configuration.
        </DialogDescription>
      </DialogHeader>

      <div>
        <Table :index="false" :filterable="false" :data="configHeaders" :columns="configHeadersTableColumns" />
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button @click="onConfirmClick">
            Confirm
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
