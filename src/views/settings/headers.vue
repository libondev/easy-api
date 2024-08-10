<route>
  meta:
    title: Headers
    description: The request header applied to each request.
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
import { getLocaleHeaders, setLocaleHeaders } from '@/constants/request.ts'
import type { RequestConfigures } from '@/types/request.ts'

const headers = ref<RequestConfigures>([])

const tableColumns = [
  getPrimaryKeyColumn(),
  getRowValueColumn(),
  getEnableColumn('switch'),
  getOperateColumn(
    onCreateClick(headers, () => ({ id: `${Date.now()}` })),
    onRemoveClick(headers),
  ),
]

onMounted(async () => {
  headers.value = await getLocaleHeaders()
})

onBeforeUnmount(() => {
  setLocaleHeaders(headers.value.filter(({ key }) => key).map(toRaw))
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
    :data="headers"
    :filterable="false"
    :columns="tableColumns"
  />
</template>
