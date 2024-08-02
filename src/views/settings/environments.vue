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
  setLocaleEnvironments(environments.value.filter(({ label }) => label).map(toRaw))
}, 1000)

const tableColumns: ITableColumn[] = [
  {
    title: 'Nama',
    field: 'label',
    renderCell: ({ row }) => h(Input, {
      'name': Math.random(),
      'modelValue': row.label,
      'onUpdate:modelValue': (value) => {
        row.label = value
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
    label: '',
    value: '',
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
