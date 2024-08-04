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
import type { RequestConfigures } from '@/constants/request'

const headers = ref<RequestConfigures>([])

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
    width: 75,
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
    renderHead: () => h(Button, {
      variant: 'outline',
      class: 'size-7 p-1',
      onClick: onCreateClick,
    }, () => [h('i', { class: 'i-ph-plus-bold' })]),
    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'size-7 p-1',
      onClick: () => {
        headers.value.splice(idx, 1)
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

onMounted(async () => {
  headers.value = await getLocaleHeaders()
})
</script>

<template>
  <h3 class="text-xl font-medium">
    Headers
  </h3>
  <p class="mb-4">
    The request header applied to each request
  </p>

  <Table :data="headers" :columns="tableColumns" height="420px" :filterable="false" />
</template>
