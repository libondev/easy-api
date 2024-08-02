<route>
  meta:
    title: Environments
</route>

<script lang="ts" setup>
import { h } from 'vue'
import { debounce } from 'es-toolkit'

import type { Environments } from '@/constants/request'
import { getLocaleEnvironments, setLocaleEnvironments } from '@/constants/request'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import type { ITableColumn } from '@/components/ui/table'

const environments = ref<Environments>([])

const onUpdateEnvs = debounce(() => {
  setLocaleEnvironments(environments.value.filter(({ name }) => name).map(toRaw))
}, 600)

const tableColumns: ITableColumn[] = [
  {
    title: 'Name',
    field: 'name',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'modelValue': row.name,
      'onUpdate:modelValue': (value) => {
        row.name = value
        onUpdateEnvs()
      },
    }),
  },
  {
    title: 'Value',
    field: 'id',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'modelValue': row.id,
      'onUpdate:modelValue': (value) => {
        row.id = value
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
    name: '',
    id: '',
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
  <div>
    <div class="text-xl font-medium mb-4">
      Environments
    </div>

    <Table :data="environments" data-key="invoice" :columns="tableColumns" height="420px">
      <template #header>
        <div class="flex-1">
          <Button variant="outline" class="px-2" @click="onCreateClick">
            <i class="i-ph-plus-bold" />
          </Button>
        </div>
      </template>
    </Table>
  </div>
</template>
