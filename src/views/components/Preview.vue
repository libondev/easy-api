<script lang="ts" setup>
import type { RequestResult, RequestStatus } from '@/types/request'
import { formatTimestampWithUnit } from '@/utils/parsers/date'
import { calculateStringByteSize, formatStringSizeWithUnit } from '@/utils/parsers/string'

const props = defineProps<{
  result: RequestResult
  status: RequestStatus
}>()

const textareaRef = shallowRef<HTMLTextAreaElement>()

const formattedDurations = computed(() => formatTimestampWithUnit(props.status.durations))
const formattedBodySizes = computed(() => formatStringSizeWithUnit(calculateStringByteSize(props.result)))

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
  textareaRef.value?.select()
  document.execCommand('copy')
}
</script>

<template>
  <div class="flex flex-col h-full pr-1">
    <ul class="p-2 border-b font-mono flex items-center gap-2">
      <li>
        <Badge variant="outline" class="py-1">
          <i class="size-2 rounded-full mr-1" :class="getCodeStatusColor()" />
          {{ status.code }}
        </Badge>
      </li>

      <li class="flex items-center">
        <Badge variant="outline" class="py-1">
          <i class="i-mdi-approximately-equal" />
          <span class="pl-0.5">{{ formattedDurations.size }}</span>
          <span class="opacity-75 scale-75 uppercase font-sans">{{ formattedDurations.unit }}</span>
        </Badge>
      </li>

      <li class="flex items-center">
        <Badge variant="outline" class="py-1">
          <i class="i-mdi-approximately-equal" />
          <span class="pl-0.5">{{ formattedBodySizes.size }}</span>
          <span class="opacity-75 scale-75 uppercase font-sans">{{ formattedBodySizes.unit }}</span>
        </Badge>
      </li>

      <!-- placeholder, fill container height -->
      <li class="h-8" />
    </ul>

    <div class="relative p-2 group">
      <Button class="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100" @click="onCopyClick">
        Copy
      </Button>

      <textarea
        ref="textareaRef"
        :value="result"
        placeholder="Empty response text"
        class="border-0 outline-0 w-full h-full resize-none"
        style="font-family:MonoLisa,'JetBrains Mono',Hack,Menlo,'Courier New',Courier,monospace"
        readonly
      />
    </div>
  </div>
</template>
