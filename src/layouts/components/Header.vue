<script lang="ts" setup>
import Menus from './Menus.vue'
import Profiler from './Profiler.vue'
import ToggleMode from './ToggleMode.vue'
import OperateGuide from './OperateGuide.vue'
</script>

<template>
  <div class="sticky top-0 flex items-center p-2 pr-4 bg-background border-b">
    <div class="flex items-center flex-1">
      <Profiler />
      <Menus />
    </div>

    <div class="flex gap-1.5">
      <ToggleMode />

      <OperateGuide />
    </div>
  </div>
</template>
