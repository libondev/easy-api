<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/utils/cls.ts'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const className = computed(() => cn(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
  props.class,
))
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="className"
  >
    <CheckboxIndicator class="relative flex h-full w-full items-center justify-center text-current">
      <slot>
        <CheckIcon class="absolute size-full" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
