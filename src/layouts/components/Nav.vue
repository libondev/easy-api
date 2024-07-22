<script lang="ts" setup>
import { cn } from '@/utils/cls.ts'
import { buttonVariants } from '@/components/ui/button'

export interface LinkProp {
  title: string
  label?: string
  icon: string
  toPath: string
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div :data-collapsed="isCollapsed" class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of links" :key="`1-${index}`">
        <!-- <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <RouterLink
              :to="link.toPath"
              :class="buttonVariants({ variant: 'ghost', size: 'icon' })"
              :active-class="cn('pointer-events-none', buttonVariants({ variant: 'default' }))"
            >
              <i class="size-4 min-w-4" :class="link.icon" />
              <span class="sr-only ml-2">{{ link.title }}</span>
            </RouterLink>
          </TooltipTrigger>

          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
            <span v-if="link.label" class="ml-auto text-muted-foreground">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip> -->

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
