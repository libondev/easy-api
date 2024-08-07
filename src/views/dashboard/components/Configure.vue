<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { RequestConfigures } from '@/types/request'
import {
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
  DASHBOARD_TABS_CHECKED_KEY,
} from '@/constants/layout'

const Params = defineAsyncComponent(() => import('./Params.vue'))
const ConfTable = defineAsyncComponent(() => import('./ConfTable.vue'))

const requestHeaders = defineModel<RequestConfigures>('headers', { default: [] })
const requestQueries = defineModel<RequestConfigures>('queries', { default: [] })

const checkedTabs = useStorage<string>(
  DASHBOARD_TABS_CHECKED_KEY,
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
)

const queriesDataTypes = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
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
      <TabsTrigger class="flex-1" value="params">
        Params
      </TabsTrigger>
    </TabsList>

    <TabsContent value="header">
      <ConfTable v-model="requestHeaders" />
    </TabsContent>
    <TabsContent value="query">
      <ConfTable v-model="requestQueries" :data-types="queriesDataTypes" />
    </TabsContent>
    <TabsContent value="params">
      <Params />
    </TabsContent>
  </Tabs>
</template>
