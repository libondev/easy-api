<script lang="ts" setup>
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { SETTINGS_MENUS } from '@/constants/layout'

const menus = [
  {
    label: 'Settings',
    icon: 'i-carbon-settings',
    children: SETTINGS_MENUS,
  },
]
</script>

<template>
  <RouterLink
    to="/dashboard"
    class="py-1 px-3 rounded-sm inline-flex items-center select-none text-sm font-medium cursor-default hover:bg-accent hover:text-accent-foreground"
  >
    <i class="i-carbon-running mr-1" />
    Dashboard
  </RouterLink>

  <Menubar class="rounded-none border-none shadow-none px-2 h-8 pl-1.5">
    <MenubarMenu v-for="menu of menus" :key="menu.label">
      <MenubarTrigger class="flex items-center">
        <i :class="menu.icon" class="mr-1" />
        {{ menu.label }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem v-for="item of menu.children" :key="item.label" as-child>
          <RouterLink :to="item.link" class="flex justify-between">
            <span>{{ item.label }}</span>

            <i v-if="item.icon" class="size-4" :class="item.icon" />
          </RouterLink>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
