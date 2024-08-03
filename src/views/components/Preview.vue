<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { formatTimestampWithUnit } from '@/utils/parsers/date'
import { calculateStringByteSize, formatStringSizeWithUnit } from '@/utils/parsers/string'

import type { PanelDirection } from '@/types/layout'
import type { RequestResult, RequestStatus } from '@/types/request'

const props = defineProps<{
  result: RequestResult
  status: RequestStatus
}>()

const panelDirection = defineModel<PanelDirection>('direction')

const formattedDurations = computed(() => formatTimestampWithUnit(props.status.durations))
const formattedBodySizes = computed(() => formatStringSizeWithUnit(calculateStringByteSize(props.result)))

const onTogglePanelDirection = useToggle(panelDirection, {
  truthyValue: 'horizontal',
  falsyValue: 'vertical',
})

function getCodeStatusColor() {
  const { code } = props.status

  if (code >= 200 && code < 300) {
    return 'bg-green-300'
  } else if (code >= 300 && code < 400) {
    return 'bg-orange-300'
  } else if (code >= 400 && code < 500) {
    return 'bg-purple-300'
  } else if (code >= 500) {
    return 'bg-red-300'
  }

  return ''
}

function onCopyClick() {
  navigator.clipboard.writeText(props.result)
    .then(() => {
      toast('Copied response body successful.')
    }).catch(() => {
      toast('Copy failed, please try to copy manually.')
    })
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ul class="p-2 border-b border-border flex items-center gap-2">
      <li title="Toggle preview panel position">
        <Button variant="ghost" size="icon" @click="onTogglePanelDirection()">
          <i class="size-4 pointer-events-none" :class="panelDirection === 'horizontal' ? 'i-carbon-bottom-panel-close-filled' : 'i-carbon-right-panel-close-filled'" />
        </Button>
      </li>

      <li title="Status code of request response">
        <Badge v-show="status.code" variant="outline" class="py-1 cursor-default font-mono">
          <i class="size-2 rounded-full mr-1" :class="getCodeStatusColor()" />
          {{ status.code }}
        </Badge>
      </li>

      <li title="Response durations time (approximate value)">
        <Badge v-show="formattedDurations.size" variant="outline" class="py-1 cursor-default">
          <i class="i-mdi-approximately-equal" />
          <span class="pl-0.5 font-mono">{{ formattedDurations.size }}</span>
          <span class="opacity-75 scale-75 origin-bottom uppercase select-none font-sans">{{ formattedDurations.unit }}</span>
        </Badge>
      </li>

      <li title="Response body size (approximate value)">
        <Badge v-show="formattedBodySizes.size" variant="outline" class="py-1 cursor-default">
          <i class="i-mdi-approximately-equal" />
          <span class="pl-0.5 font-mono">{{ formattedBodySizes.size }}</span>
          <span class="opacity-75 scale-75 origin-bottom uppercase select-none font-sans">{{ formattedBodySizes.unit }}</span>
        </Badge>
      </li>
    </ul>

    <div class="relative p-2 group w-full h-full">
      <Button v-show="result" class="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100" @click="onCopyClick">
        Copy
      </Button>

      <textarea
        :value="result"
        placeholder="Empty response text"
        class="border-0 outline-0 w-full h-full resize-none text-sm font-mono bg-transparent"
        readonly
      />
    </div>
  </div>
</template>
