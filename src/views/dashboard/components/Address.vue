<script lang="ts" setup>
import { createMentions } from 'mentions.js'

import { getLocaleEnvironments } from '@/constants/request'
import type { RequestEnvironments } from '@/types/request'

const emits = defineEmits<{
  (e: 'submit'): void
}>()

const inputRef = shallowRef<HTMLElement>()

const modelValue = defineModel<string>()

function onKeydownEnter(event: KeyboardEvent) {
  if (event.code !== 'Enter')
    return

  emits('submit')
}

let mentionsRef: ReturnType<typeof createMentions>

function initMentions(environmentList: RequestEnvironments) {
  if (mentionsRef)
    return

  mentionsRef = createMentions({
    prefix: '#',
    suffix: '',
    labelFieldName: 'key',
    valueFieldName: 'value',
    value: modelValue.value,
    options: environmentList,
  })

  mentionsRef.on('change', (value: string) => {
    modelValue.value = value.trim()
  })

  mentionsRef.mount(inputRef.value!)

  nextTick(() => {
    const div = inputRef.value!.querySelector('.vanilla-mentions__input')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    div?.addEventListener('keydown', onKeydownEnter)
  })
}

function destroyMentions() {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  inputRef.value!.querySelector('.vanilla-mentions__input')?.removeEventListener('keydown', onKeydownEnter)

  mentionsRef!.clear()
  mentionsRef!.destroy()
}

getLocaleEnvironments().then(initMentions)

const unwatch = watch(modelValue, (nv) => {
  // The first load may not get the cache yet
  if (!nv) {
    return
  }

  mentionsRef.set('value', nv!)
  Promise.resolve().then(unwatch)
})

onBeforeUnmount(() => {
  destroyMentions()
})
</script>

<template>
  <div ref="inputRef" class="w-full" />
</template>

<style>
.vanilla-mentions__container {
  @apply w-full h-full;
}

.vanilla-mentions__input {
  padding: 4px 8px;
  line-height: 23px;
  @apply relative h-8 w-full rounded-md text-nowrap border border-input bg-transparent text-[14px] shadow-sm overflow-hidden placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-offset-1 focus-visible:ring-ring;
}

.vanilla-mentions__mention {
  @apply bg-input py-0.5 px-1 mr-0.5 rounded whitespace-nowrap not-italic select-none;
}

.vanilla-mentions__dropdown-container {
  z-index: 2147483647;

  @apply w-max shadow-md rounded-md flex flex-col p-1.5 fixed left-0 top-0 bg-background border border-input/70;
}

.vanilla-mentions__dropdown-header {
  @apply gap-1 flex justify-center items-center pb-1.5 border-b border-dashed;
}

.vanilla-mentions__dropdown-btn-cancel,
.vanilla-mentions__dropdown-btn-multiple {
  @apply flex items-center justify-center border-none bg-transparent cursor-pointer text-center text-[12px];
  height: 18px;
  width: 28px
}

.vanilla-mentions__dropdown-filter-input {
  height: 18px;
  @apply flex-1 min-w-32 text-center text-xs outline-none bg-transparent;
}

.vanilla-mentions__dropdown-filter-input:focus {
  border-color: hsl(var(--primary));
}

.vanilla-mentions__dropdown-list-wrapper {
  @apply pt-1.5 flex-1 min-h-0 overflow-y-auto;
}

.vanilla-mentions__dropdown-list {
  list-style: none;
  margin: 0;
  max-height: 100%;
  overflow-y: auto;
  padding: 0
}

.vanilla-mentions__dropdown-list-option {
  @apply truncate px-2 leading-7 flex items-center gap-1.5 cursor-default rounded bg-transparent;
}

.vanilla-mentions__dropdown-list-option.vanilla-mentions__dropdown-list-option-active {
  background-color: hsl(var(--secondary))
}

.vanilla-mentions__dropdown-list-option.vanilla-mentions__dropdown-list-option-disabled {
  opacity: .5;
}

.vanilla-mentions__dropdown-list-option .vanilla-mentions__dropdown-checkbox {
  border: 1px solid hsl(var(--input));
  border-radius: 2px;
  display: none;
  height: 12px;
  width: 12px
}

.vanilla-mentions__dropdown-list-wrapper .vanilla-mentions__dropdown-empty {
  align-items: center;
  border-radius: 4px;
  color: #ccc;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 8px;
  justify-content: center;
  padding: 8px 0;
  white-space: nowrap
}

.vanilla-mentions__dropdown-loading {
  align-items: center;
  background-color: hsla(0, 0%, 100%, .3);
  display: flex;
  height: 100%;
  inset: 0;
  justify-content: center;
  position: absolute;
  width: 100%
}

.vanilla-mentions__dropdown-loading-spin {
  animation: VueMentionsSpin 1s infinite
}

.vanilla-mentions__dropdown-container.vanilla-mentions__dropdown-multiple-mode .vanilla-mentions__dropdown-checkbox {
  display: inline-block !important
}

.vanilla-mentions__dropdown-list-option.vanilla-mentions__dropdown-list-option-active .vanilla-mentions__dropdown-checkbox {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
  position: relative
}

.vanilla-mentions__dropdown-list-option.vanilla-mentions__dropdown-list-option-active .vanilla-mentions__dropdown-checkbox:before {
  background-color: #fff;
  bottom: 20%;
  content: "";
  height: 2px;
  left: 50%;
  position: absolute;
  transform: rotate(-135deg);
  transform-origin: left center;
  width: 40%
}

.vanilla-mentions__dropdown-container.vanilla-mentions__dropdown-multiple-mode .vanilla-mentions__dropdown-list-option.vanilla-mentions__dropdown-list-option-active .vanilla-mentions__dropdown-checkbox:after {
  background-color: #fff;
  bottom: 20%;
  content: "";
  height: 2px;
  left: 40%;
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: left center;
  width: 60%
}

@keyframes VueMentionsSpin {
  0% {
    transform: rotate(0)
  }

  to {
    transform: rotate(1turn)
  }
}
</style>
