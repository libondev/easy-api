<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import {
  getDataTypeColumn,
  getEnableColumn,
  getOperateColumn,
  getPrimaryKeyColumn,
  getRowValueColumn,
  normalDataTypes,
  onCreateClick,
  onRemoveClick,
} from '../utils/columns.ts'

import Params from './Params.vue'
import Headers from './Headers.vue'
import {
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
  DASHBOARD_TABS_CHECKED_KEY,
} from '@/constants/layout.ts'

import type { RequestConfigures } from '@/types/request.ts'

const requestHeaders = defineModel<RequestConfigures>('headers', { default: [] })
const requestQueries = defineModel<RequestConfigures>('queries', { default: [] })

const checkedTabs = useStorage<string>(
  DASHBOARD_TABS_CHECKED_KEY,
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
)

const queriesTableColumns = [
  getEnableColumn(requestQueries),
  getPrimaryKeyColumn(),
  getDataTypeColumn(normalDataTypes),
  getRowValueColumn(),
  getOperateColumn({
    onCreate: onCreateClick(requestQueries),
    onRemove: onRemoveClick(requestQueries),
  }),
]
</script>

<template>
  <Tabs v-model="checkedTabs" class="p-2">
    <TabsList class="w-full">
      <TabsTrigger class="flex-1" value="header">
        Headers
      </TabsTrigger>
      <TabsTrigger class="flex-1" value="query">
        Query
      </TabsTrigger>
      <TabsTrigger class="flex-1" value="body">
        Body
      </TabsTrigger>
    </TabsList>

    <TabsContent value="header">
      <Headers v-model="requestHeaders" />
    </TabsContent>
    <TabsContent value="query">
      <Table :index="false" :filterable="false" :data="requestQueries" :columns="queriesTableColumns" />
    </TabsContent>
    <TabsContent value="body">
      <Params />
    </TabsContent>
  </Tabs>
</template>
