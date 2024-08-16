<script lang="ts" setup>
import { SETTINGS_MENUS } from '@/constants/layout.ts'

const menus = [
  {
    label: 'Dashboard',
    icon: 'i-carbon-running',
    link: '/dashboard',
  },
  {
    label: 'Parse Code',
    icon: 'i-carbon-code',
    link: '/parse-code',
  },
  {
    label: 'Settings',
    icon: 'i-carbon-settings',
    children: SETTINGS_MENUS,
  },
]
</script>

<template>
  <Menubar class="rounded-none border-none shadow-none px-2 h-8 pl-1.5">
    <MenubarMenu v-for="menu of menus" :key="menu.label">
      <template v-if="menu.children?.length">
        <MenubarTrigger class="flex items-center">
          <i :class="menu.icon" />
          <span class="ml-1 hidden md:inline-block">{{ menu.label }}</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem v-for="item of menu.children" :key="item.label" as-child>
            <RouterLink :to="item.link" class="flex justify-between">
              {{ item.label }}

              <i v-if="item.icon" class="size-4" :class="item.icon" />
            </RouterLink>
          </MenubarItem>
        </MenubarContent>
      </template>
      <RouterLink
        v-else
        :to="menu.link!"
        class="py-1 px-3 rounded-sm inline-flex items-center select-none text-sm font-medium cursor-default hover:bg-accent hover:text-accent-foreground"
      >
        <i :class="menu.icon" />
        <span class="ml-1 hidden md:inline-block">{{ menu.label }}</span>
      </RouterLink>
    </MenubarMenu>
  </Menubar>
</template>
