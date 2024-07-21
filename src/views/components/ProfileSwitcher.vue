<script lang="ts" setup>
const selectedProfile = defineModel<string>({
  default: 'profile1',
})

const _profiles = [
  { label: 'Profile 1', value: 'profile1' },
  { label: 'Profile 2', value: 'profile2' },
  { label: 'Profile 3', value: 'profile3' },
]
</script>

<template>
  <div class="">
    <Select v-model="selectedProfile">
      <SelectTrigger aria-label="Select profile">
        <SelectValue placeholder="Select an profile" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="profile of _profiles" :key="profile.value" v-bind="profile" />
      </SelectContent>
    </Select>
  </div>
</template>
