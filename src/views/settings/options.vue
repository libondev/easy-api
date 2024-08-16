<route>
  meta:
    title: Options
    description: Set the basic parameters of fetch function request.
</route>

<script lang="ts" setup>
import {
  DEFAULT_REQUEST_CONFIG_INJECTION_KEY,
  setLocaleDefaultConfigs,
} from '@/constants/request.ts'

const defaultConfigs = inject(DEFAULT_REQUEST_CONFIG_INJECTION_KEY)!

const previewFetchOptionsCode = computed(() => {
  let code = 'fetch(\'...\', {\n'

  const config = defaultConfigs.value
  for (const key in config) {
    code += `  ${key}: '${config[key as keyof typeof config]}',\n`
  }

  code += '});'

  return code
})

const formItems = [
  {
    field: 'mode',
    description: 'A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request\'s mode.',
    attrs: {
      type: 'select',
      options: ['cors', 'no-cors', 'same-origin'],
    },
  },
  {
    field: 'cache',
    description: 'A string indicating how the request will interact with the browser\'s cache to set request\'s cache.',
    attrs: {
      type: 'select',
      options: ['no-cache', 'default', 'reload', 'force-cache', 'only-if-cached'],
    },
  },
  {
    field: 'credentials',
    description: 'A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request\'s credentials.',
    attrs: {
      type: 'select',
      options: ['include', 'same-origin', 'omit'],
    },
  },
  {
    field: 'redirect',
    description: 'A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request\'s redirect.',
    attrs: {
      type: 'select',
      options: ['follow', 'manual', 'error'],
    },
  },
  {
    field: 'referrerPolicy',
    description: 'A referrer policy to set request\'s referrerPolicy.',
    attrs: {
      type: 'select',
      options: ['no-referrer-when-downgrade', 'no-referer', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin-when-cross-origin', 'unsafe-url'],
    },
  },
] as const

function onUpdatePreferences() {
  setLocaleDefaultConfigs(toRaw(defaultConfigs.value))
  useToast('Updated preferences successful.')
}
</script>

<template>
  <div class="space-y-6 h-full">
    <div class="rounded-md bg-input px-3 py-2 overflow-auto">
      <pre class="code-block text-sm font-mono relative">{{ previewFetchOptionsCode }}</pre>
    </div>

    <div data-orientation="horizontal" role="separator" class="bg-border relative h-px w-full" />

    <ul class="space-y-8">
      <li v-for="item, idx of formItems" :key="item.field" class="space-y-2">
        <Label :for="`field-${idx}`" class="capitalize">{{ item.field }}</Label>
        <Select :id="`field-${idx}`" v-model="defaultConfigs[item.field]" name="form items" @update:model-value="onUpdatePreferences">
          <SelectTrigger aria-label="Select profile" class="w-full">
            <SelectValue placeholder="Select an profile" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem v-for="el of item.attrs.options" :key="el" :label="el" :value="el" />
          </SelectContent>
        </Select>
        <p class="text-sm text-muted-foreground">
          {{ item.description }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.code-block::after,
.code-block::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  opacity: .6;
  height: 1.5em;
  background: hsl(var(--input));
  pointer-events: none;
}

.code-block::before {
  top: 0;
}

.code-block::after {
  bottom: 0;
}
</style>
