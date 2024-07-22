<script lang="ts" setup>
const selectedMethod = shallowRef('get')
const METHODS = [
  { label: 'Get', value: 'get' },
  { label: 'Post', value: 'post' },
  { label: 'Put', value: 'put' },
  { label: 'Delete', value: 'delete' },
  { label: 'Patch', value: 'patch' },
  { label: 'Head', value: 'head' },
  { label: 'Options', value: 'options' },
]
</script>

<template>
  <div class="p-3 h-full">
    <div class="flex gap-1 items-center">
      <Select v-model="selectedMethod">
        <SelectTrigger aria-label="Select method" class="w-24 min-w-24">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem v-for="profile of METHODS" :key="profile.value" v-bind="profile" />
        </SelectContent>
      </Select>

      <Select v-model="selectedMethod">
        <SelectTrigger aria-label="Select variable" class="w-24 min-w-24">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem v-for="profile of METHODS" :key="profile.value" v-bind="profile" />
        </SelectContent>
      </Select>

      <Input />

      <Button>Send</Button>
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt maiores eos animi, consectetur placeat hic expedita explicabo nobis ipsa optio magnam voluptas impedit nulla asperiores non. Suscipit, temporibus id?
  </div>
</template>
