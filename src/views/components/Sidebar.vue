<script lang="ts" setup>
import Nav, { type LinkProp } from './Nav.vue'
import ProfileSwitcher from './ProfileSwitcher.vue'

defineProps<{
  isCollapsed: boolean
}>()

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]
</script>

<template>
  <div class="h-full">
    <div class="p-3">
      <ProfileSwitcher />
    </div>

    <Separator />

    <Nav :is-collapsed :links="links" />

    <div class="p-3">
      <Button variant="ghost" class="px-3">
        <i class="i-carbon-prompt-session mr-1.5" />
        Sessions
      </Button>

      <Button variant="ghost" class="px-3">
        <i class="i-carbon-ibm-z-environments-dev-sec-ops mr-1.5" />
        Environments
      </Button>
    </div>

    <Separator />
  </div>
</template>
