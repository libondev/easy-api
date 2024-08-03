<script lang="ts" setup>
import type { ITableColumn } from '@/components/ui/table/index.ts'
import type { RequestHeader } from '@/constants/request.ts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface InternalHeaderType extends RequestHeader {
  isCustom?: boolean
}

const headers = defineModel<InternalHeaderType[]>('headers', { default: [] })

const tableColumns: ITableColumn[] = [
  {
    title: '',
    field: 'enable',
    width: 40,
    headClass: 'text-center',
    cellClass: 'text-center',
    renderCell: ({ row }) => h(Checkbox, {
      'checked': row.enable,
      'onUpdate:checked': (value) => {
        row.enable = value
      },
    }),
  },
  {
    title: 'Key',
    field: 'key',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'disabled': !row.isCustom,
      'modelValue': row.key,
      'onUpdate:modelValue': (value) => {
        row.key = value
      },
    }),
  },
  {
    title: 'Value',
    field: 'value',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'disabled': !row.isCustom,
      'modelValue': row.value,
      'onUpdate:modelValue': (value) => {
        row.value = value
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
      class: 'px-2',
      onClick: onCreateClick,
    }, () => [h('i', { class: 'i-ph-plus-bold' })]),

    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'h-6 px-1.5',
      onClick: () => {
        headers.value.splice(idx, 1)
      },
    }, () => [h('i', { class: 'i-carbon-trash-can' })]),
  },
]

function onCreateClick() {
  headers.value.push({
    key: '',
    value: '',
    enable: true,
    isCustom: true,
  })
}
</script>

<template>
  <Table
    :data="headers"
    :index="false"
    :filterable="false"
    :columns="tableColumns"
  />
</template>
