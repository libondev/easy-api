<script lang="ts" setup>
import { h } from 'vue'
import type { ITableColumn } from '@/components/ui/table/index.ts'
import type { RequestConfigure } from '@/constants/request.ts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface InternalHeaderType extends RequestConfigure {
  isCustom?: boolean
}

const modelValueList = defineModel<InternalHeaderType[]>('modelValue', { default: [] })

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
      'class': row.enable ? '' : 'opacity-50',
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
      'class': row.enable ? '' : 'opacity-50',
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
      class: 'size-7 p-1',
      onClick: onCreateClick,
    }, () => [h('i', { class: 'i-ph-plus-bold' })]),
    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'size-7 p-1',
      onClick: () => {
        modelValueList.value.splice(idx, 1)
      },
    }, () => [h('i', { class: 'i-carbon-trash-can' })]),
  },
]

function onCreateClick() {
  modelValueList.value.push({
    key: '',
    value: '',
    enable: true,
    isCustom: true,
  })
}
</script>

<template>
  <Table
    :data="modelValueList"
    :index="false"
    :filterable="false"
    :columns="tableColumns"
  />
</template>
