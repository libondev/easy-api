<script lang="ts" setup>
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'

const menus = [
  {
    label: 'Settings',
    children: [
      {
        label: 'Config',
        icon: 'i-carbon-http',
        link: '/settings/config',
      },
      {
        label: 'Sessions',
        icon: 'i-carbon-prompt-session',
        link: '/settings/sessions',
      },
      {
        label: 'Environments',
        icon: 'i-carbon-ibm-z-environments-dev-sec-ops',
        link: '/settings/environments',
      },
    ],
  },
]
</script>

<template>
  <RouterLink
    to="/"
    class="ml-1.5 py-1 px-3 rounded-sm select-none text-sm font-medium cursor-default hover:bg-accent hover:text-accent-foreground"
  >
    Dashboard
  </RouterLink>

  <Menubar class="rounded-none border-none shadow-none px-2 h-8 pl-1.5">
    <MenubarMenu v-for="menu of menus" :key="menu.label">
      <MenubarTrigger>{{ menu.label }}</MenubarTrigger>
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
