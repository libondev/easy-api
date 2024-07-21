<script lang="ts" setup>
const { path } = useRoute('/[...path]')
</script>

<template>
  <div>{{ path }}</div>
</template>
