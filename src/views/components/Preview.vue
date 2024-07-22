<script lang="ts" setup>
import type { RequestResult, RequestStatus } from '@/types/request'

const props = defineProps<{
  result: RequestResult
  status: RequestStatus
}>()

function getStatusColor() {
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
</script>

<template>
  <div class="flex flex-col h-full pr-1">
    <ul class="p-2 border-b font-mono flex items-center gap-2">
      <li>
        <Badge variant="outline" class="py-1">
          <i class="size-2 rounded-full mr-1" :class="getStatusColor()" />
          {{ status.code }}
        </Badge>
      </li>

      <li class="flex items-center">
        <Badge variant="outline" class="py-1">
          ≈ <span class="pl-0.5">{{ status.durations }}ms</span>
        </Badge>
      </li>

      <li class="h-8" />
    </ul>

    <ScrollArea class="flex-1 p-2">
      <pre class="w-full break-all whitespace-pre-wrap">{{ JSON.stringify(result, null, 2) }}</pre>
    </ScrollArea>
  </div>
</template>
