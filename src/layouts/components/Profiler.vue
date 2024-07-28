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
  <Select v-model="selectedProfile" name="selected-profile">
    <SelectTrigger aria-label="Select profile" class="w-52 min-w-52">
      <SelectValue placeholder="Select an profile" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="profile of _profiles" :key="profile.value" v-bind="profile" />
    </SelectContent>
  </Select>
</template>
