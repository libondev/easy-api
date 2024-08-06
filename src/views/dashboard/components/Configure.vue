<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import type { RequestConfigures } from '@/constants/request.ts'
import {
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
  DASHBOARD_TABS_CHECKED_KEY,
} from '@/constants/layout'

const Params = defineAsyncComponent(() => import('./Params.vue'))
const ConfigTable = defineAsyncComponent(() => import('./ConfigTable.vue'))

const requestBody = defineModel<any>('body', { default: '' })
const requestHeaders = defineModel<RequestConfigures>('headers', { default: [] })
const requestQueries = defineModel<RequestConfigures>('queries', { default: [] })

const checkedTabs = useStorage<string>(
  DASHBOARD_TABS_CHECKED_KEY,
  DASHBOARD_TABS_CHECKED_DEFAULT_VALUE,
)
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
      <ConfigTable v-model="requestHeaders" />
    </TabsContent>
    <TabsContent value="query">
      <ConfigTable v-model="requestQueries" enable-data-type />
    </TabsContent>
    <TabsContent value="params">
      <Params v-model="requestBody" />
    </TabsContent>
  </Tabs>
</template>
