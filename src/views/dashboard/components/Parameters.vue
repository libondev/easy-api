<script lang="ts" setup>
const modelValue = defineModel<string>()

const BODY_TYPE = [
  'Raw',
  // 'FormData',
  // 'GraphQL',
]
</script>

<template>
  <div class="flex gap-4">
    <RadioGroup :default-value="BODY_TYPE[0]" class="flex-col pt-4 w-24 min-w-24">
      <div v-for="type of BODY_TYPE" :key="type" class="flex items-center gap-x-1">
        <RadioGroupItem :id="type" :value="type" />
        <Label :for="type" class="cursor-pointer">{{ type }}</Label>
      </div>
    </RadioGroup>

    <textarea
      v-model="modelValue"
      name="request-body"
      class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</template>
