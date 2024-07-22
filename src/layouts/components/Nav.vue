<script lang="ts" setup>
import { cn } from '@/utils/cls.ts'
import { buttonVariants } from '@/components/ui/button'

export interface LinkProp {
  icon: string
  title: string
  label?: string
  toPath: string
}

interface NavProps {
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of links" :key="`1-${index}`">
        <RouterLink
          :to="link.toPath"
          class="!justify-start"
          :class="buttonVariants({ variant: 'ghost' })"
          :active-class="cn('pointer-events-none', buttonVariants({ variant: 'default' }))"
        >
          <i class="mr-2 size-4 min-w-4" :class="link.icon" />
          {{ link.title }}
          <!-- <span
            v-if="link.label"
            class="text-background dark:text-white"
          >
            {{ link.label }}
          </span> -->
        </RouterLink>
      </template>
    </nav>
  </div>
</template>
