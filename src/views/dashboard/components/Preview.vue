<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { formatTimestampWithUnit } from '@/utils/parsers/date'
import { calculateStringByteSize, formatStringSizeWithUnit } from '@/utils/parsers/string'

import type { PanelDirection } from '@/types/layout'
import type { RequestResults } from '@/types/request.ts'

const props = defineProps<{
  result: RequestResults
  pending: boolean
}>()

const panelDirection = defineModel<PanelDirection>('direction')

const formattedDurations = computed(() => formatTimestampWithUnit(props.result.durations))
const formattedBodySizes = computed(() => formatStringSizeWithUnit(calculateStringByteSize(props.result.text)))

const onTogglePanelDirection = useToggle(panelDirection, {
  truthyValue: 'horizontal',
  falsyValue: 'vertical',
})

function getCodeStatusColor() {
  const { code } = props.result

  if (code >= 200 && code < 300) {
    return 'bg-green-300'
  } else if (code >= 300 && code < 400) {
    return 'bg-purple-300'
  } else if (code >= 400 && code < 500) {
    return 'bg-orange-300'
  } else if (code >= 500) {
    return 'bg-red-300'
  }

  return 'bg-gray-400'
}

function onCopyClick() {
  navigator.clipboard.writeText(props.result.text)
    .then(() => {
      useToast('Copied response body successful.')
    }).catch(() => {
      useToast('Copy failed, please try to copy manually.')
    })
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ul class="p-2 border-b border-border flex items-center gap-2">
      <li title="Toggle preview panel position">
        <Button variant="ghost" size="icon" @click="onTogglePanelDirection()">
          <i class="size-4" :class="panelDirection === 'horizontal' ? 'i-carbon-bottom-panel-close-filled' : 'i-carbon-right-panel-close-filled'" />
        </Button>
      </li>

      <li title="Status code of request response">
        <Badge variant="outline" class="py-1 cursor-default font-mono">
          <i class="size-2 rounded-full mr-1" :class="getCodeStatusColor()" />
          {{ result.code ?? 0 }}
        </Badge>
      </li>

      <li title="Response durations time (approximate value)">
        <Badge variant="outline" class="py-1 cursor-default">
          <i class="i-mdi-approximately-equal" />
          <span class="font-mono">{{ formattedDurations.size }}</span>
          <span class="opacity-75 scale-75 origin-[left] ml-0.5 uppercase select-none font-sans">{{ formattedDurations.unit }}</span>
        </Badge>
      </li>

      <li title="Response body size (approximate value)">
        <Badge variant="outline" class="py-1 cursor-default">
          <i class="i-mdi-approximately-equal" />
          <span class="font-mono">{{ formattedBodySizes.size }}</span>
          <span class="opacity-75 scale-75 origin-[left] ml-0.5 uppercase select-none font-sans">{{ formattedBodySizes.unit }}</span>
        </Badge>
      </li>
    </ul>

    <div class="relative p-4 group w-full h-full">
      <Button v-show="result.text" class="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100" @click="onCopyClick">
        Copy
      </Button>

      <div v-if="pending" class="absolute w-full h-full left-0 top-0 backdrop-blur-sm pointer-events-none" />

      <textarea
        :value="result.text"
        name="response-result"
        placeholder="Empty response text"
        class="border-0 outline-0 w-full h-full resize-none text-sm font-mono bg-transparent"
        readonly
      />
    </div>
  </div>
</template>
