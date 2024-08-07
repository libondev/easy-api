<route>
  meta:
    title: Environments
</route>

<script lang="ts" setup>
import { h } from 'vue'
import { debounce } from 'es-toolkit'

import type { RequestEnvironments } from '@/constants/request'
import { getLocaleEnvironments, setLocaleEnvironments } from '@/constants/request'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import type { ITableColumn } from '@/components/ui/table'

const environments = ref<RequestEnvironments>([])

const onUpdateEnvs = debounce(() => {
  setLocaleEnvironments(environments.value.filter(({ key }) => key).map(toRaw))
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
        environments.value.splice(idx, 1)
        onUpdateEnvs()
      },
    }, () => [h('i', { class: 'i-carbon-trash-can' })]),
  },
]

function onCreateClick() {
  environments.value.unshift({
    value: '',
    key: '',
  })

  onUpdateEnvs()
}

onMounted(() => {
  getLocaleEnvironments().then((data) => {
    environments.value = data
  })
})
</script>

<template>
  <h3 class="text-xl font-medium">
    RequestEnvironments
  </h3>
  <p class="mb-4">
    Save state values as atomized states for easy reuse
  </p>

  <Table :data="environments" :columns="tableColumns" :filterable="false" height="420px" />
</template>
