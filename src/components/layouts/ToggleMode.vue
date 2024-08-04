<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { name } from '@/../package.json'

// 如果用户没有设置过主题选项(包含第一次进入系统)，那么就使用系统的明暗主题设置
const isDark = useDark({ storageKey: `${name}.system.color-mode` })
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleDark()">
    <i class="block pointer-events-none text-lg" :class="isDark ? 'i-solar-moon-bold' : 'i-solar-sun-bold'" />
  </Button>
</template>
