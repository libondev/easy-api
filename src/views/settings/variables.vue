<route>
  meta:
    title: Variables
    description: Save state values as atomized states for easy reuse.
</route>

<script lang="ts" setup>
import {
  getEnableColumn,
  getOperateColumn,
  getPrimaryKeyColumn,
  getRowValueColumn,
  onCreateClick,
  onRemoveClick,
} from '../dashboard/utils/columns.ts'

import type { RequestConfigures } from '@/types/request.ts'
import { getLocaleVariables, setLocaleVariables } from '@/constants/request.ts'

const environments = ref<RequestConfigures>([])

const tableColumns = [
  getPrimaryKeyColumn(),
  getRowValueColumn(),
  getEnableColumn(environments, 'switch'),
  getOperateColumn({
    onCreate: onCreateClick(environments),
    onRemove: onRemoveClick(environments),
  }),
]

onMounted(async () => {
  environments.value = await getLocaleVariables()
})

onBeforeUnmount(() => {
  setLocaleVariables(environments.value.filter(({ key }) => key).map(toRaw))
})
</script>

<template>
  <h3 class="text-xl font-medium">
    {{ $route.meta.title }}
  </h3>
  <p class="mb-4">
    {{ $route.meta.description }}
  </p>

  <Table
    height="420px"
    :filterable="false"
    :data="environments"
    :columns="tableColumns"
  />
</template>
