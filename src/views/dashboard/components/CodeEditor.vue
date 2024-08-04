<script lang="ts" setup>
import { EditorView, basicSetup } from 'codemirror'
import { json } from '@codemirror/lang-json'

const containerRef = shallowRef<HTMLDivElement>()

let editor: EditorView

onMounted(() => {
  editor = new EditorView({
    extensions: [
      basicSetup,
      json(),
    ],
    parent: containerRef.value,
  })
})

onBeforeUnmount(() => {
  editor?.destroy()
})
</script>

<template>
  <div ref="containerRef" class="rounded bg-[#f5f5f5] overflow-hidden" />
</template>
