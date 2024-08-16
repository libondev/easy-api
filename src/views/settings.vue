<script lang="ts" setup>
import { SETTINGS_MENUS } from '@/constants/layout.ts'
</script>

<template>
  <div class="h-full px-4 md:px-16 overflow-auto">
    <div class="py-6 border-b">
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage settings and preferences for requests.
      </p>
    </div>

    <div class="flex flex-col pt-6 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="lg:w-1/5">
        <nav class="w-full flex gap-x-2 lg:flex-col lg:gap-x-0 lg:gap-y-1">
          <RouterLink
            v-for="menu of SETTINGS_MENUS"
            :key="menu.link"
            :to="menu.link"
            class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start  hover:bg-muted"
            active-class="bg-muted pointer-events-none"
          >
            {{ menu.label }}
          </RouterLink>
        </nav>
      </aside>

      <div class="pb-20 h-full overflow-auto">
        <div class="lg:max-w-2xl">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
