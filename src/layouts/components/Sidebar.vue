<script lang="ts" setup>
import Profiler from './Profiler.vue'
import Nav, { type LinkProp } from './Nav.vue'

const internalMenuLinks: LinkProp[] = [
  {
    title: 'Dashboard',
    icon: 'i-carbon-cyclist',
    toPath: '/',
  },
  {
    title: 'Sessions',
    icon: 'i-carbon-prompt-session',
    toPath: '/sessions',
  },
  {
    title: 'Environments',
    icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
    toPath: '/environments',
  },
]
</script>

<template>
  <div class="h-full w-60 min-w-60 border-r flex flex-col">
    <div class="p-2 border-b">
      <Profiler />
    </div>

    <Nav :links="internalMenuLinks" />

    <div class="border-t p-2">
      <Button size="xs">
        Create
      </Button>
    </div>

    <ScrollArea class="flex-1 p-2">
      <li v-for="item of 50" :key="item">
        {{ item }}
      </li>
    </ScrollArea>
  </div>
</template>
