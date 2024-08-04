<route>
  meta:
    title: RequestEnvironments
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
    title: 'Name',
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
    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'h-6 px-1.5',
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
  <p>Save state values as atomized states for easy reuse</p>

  <div data-orientation="horizontal" role="separator" class="my-6 bg-border relative h-px w-full" />

  <Table :data="environments" :columns="tableColumns" height="420px">
    <template #header>
      <div class="flex-1">
        <Button variant="outline" class="px-2" @click="onCreateClick">
          <i class="i-ph-plus-bold" />
        </Button>
      </div>
    </template>
  </Table>
</template>
