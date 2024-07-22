<script lang="ts" setup>
import Profiler from './Profiler.vue'
import Nav from './Nav.vue'
import { INTERNAL_MENU_LINK } from '@/constants/layout'
</script>

<template>
  <div class="h-full w-60 min-w-60 border-r flex flex-col">
    <div class="p-2 border-b">
      <Profiler />
    </div>

    <Nav :links="INTERNAL_MENU_LINK" />

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
