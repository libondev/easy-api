<script lang="ts" setup>
import { INTERNAL_MENU_LINK as links } from '@/constants/layout'
</script>

<template>
  <nav class="flex gap-1.5 px-2 select-none">
    <RouterLink
      v-for="link of links"
      :key="link.toPath"
      :to="link.toPath"
      :title="link.title"
      class="flex items-center h-8 px-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
      active-class="pointer-events-none bg-primary text-primary-foreground"
    >
      <i class="size-4 min-w-4" :class="link.icon" />
      <span class="ml-1.5 hidden md:block"> {{ link.title }}</span>
    </RouterLink>
  </nav>
</template>
