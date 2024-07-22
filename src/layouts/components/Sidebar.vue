<script lang="ts" setup>
import Profiler from './Profiler.vue'
import Nav, { type LinkProp } from './Nav.vue'

defineProps<{
  links?: LinkProp[]
  isCollapsed: boolean
}>()

const internalMenuLinks: LinkProp[] = [
  {
    title: 'Home',
    label: '128',
    icon: 'i-carbon-cyclist',
    toPath: '/',
  },
  {
    title: 'Sessions',
    label: '128',
    icon: 'i-carbon-prompt-session',
    toPath: '/sessions',
  },
  {
    title: 'Environments',
    label: '9',
    icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
    toPath: '/environments',
  },
]
</script>

<template>
  <div class="h-full w-60 min-w-60 border-r">
    <div class="p-2 border-b">
      <Profiler />
    </div>

    <Nav :is-collapsed :links="internalMenuLinks" />

    <div class="p-2 border-t">
      123
    </div>
  </div>
</template>
