<script lang="ts" setup>
const menus = [
  { text: 'Request Options', path: 'request' },
  { text: 'Sessions', path: 'sessions' },
  { text: 'Environments', path: 'environments' },
]
</script>

<template>
  <div class="space-y-6 px-12 h-full overflow-auto">
    <div class="py-6 border-b">
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage settings and preferences for requests.
      </p>
    </div>

    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <RouterLink
            v-for="menu of menus"
            :key="menu.path"
            :to="menu.path"
            class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start  hover:bg-muted"
            active-class="bg-muted pointer-events-none"
          >
            {{ menu.text }}
          </RouterLink>
        </nav>
      </aside>

      <div class="flex-1 pb-20 lg:max-w-xl space-y-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
