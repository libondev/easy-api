<route>
  meta:
    title: Headers
</route>

<script lang="ts" setup>
import { h } from 'vue'
import { debounce } from 'es-toolkit'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { getLocaleHeaders, setLocaleHeaders } from '@/constants/request'
import type { ITableColumn } from '@/components/ui/table'
import type { RequestHeaders } from '@/constants/request'

const headers = ref<RequestHeaders>([])

const onUpdateEnvs = debounce(() => {
  setLocaleHeaders(headers.value.filter(({ key }) => key).map(toRaw))
}, 600)

const tableColumns: ITableColumn[] = [
  {
    title: 'Key',
    field: 'key',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'modelValue': row.key,
      'onUpdate:modelValue': (value) => {
        row.key = value
        onUpdateEnvs()
      },
    }),
  },
  {
    title: 'Value',
    field: 'value',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'modelValue': row.value,
      'onUpdate:modelValue': (value) => {
        row.value = value
        onUpdateEnvs()
      },
    }),
  },
  {
    title: 'Enable',
    field: 'enable',
    width: 100,
    headClass: 'text-center',
    cellClass: 'text-center',
    renderCell: ({ row }) => h(Switch, {
      'checked': row.enable,
      'onUpdate:checked': (value) => {
        row.enable = value
        onUpdateEnvs()
      },
    }),
  },
  {
    title: '',
    field: 'operate',
    width: 50,
    headClass: 'text-center',
    cellClass: 'text-center',
    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'h-6 px-1.5',
      onClick: () => {
        headers.value.splice(idx, 1)
        onUpdateEnvs()
      },
    }, () => [h('i', { class: 'i-carbon-trash-can' })]),
  },
]

function onCreateClick() {
  headers.value.unshift({
    key: '',
    value: '',
    enable: true,
  })

  onUpdateEnvs()
}

onMounted(() => {
  getLocaleHeaders().then((data) => {
    headers.value = data
  })
})
</script>

<template>
  <h3 class="text-xl font-medium">
    Headers
  </h3>
  <p>The request header applied to each request</p>

  <div data-orientation="horizontal" role="separator" class="my-6 bg-border relative h-px w-full" />

  <Table :data="headers" data-key="invoice" :columns="tableColumns" height="420px">
    <template #header>
      <div class="flex-1">
        <Button variant="outline" class="px-2" @click="onCreateClick">
          <i class="i-ph-plus-bold" />
        </Button>
      </div>
    </template>
  </Table>
</template>
