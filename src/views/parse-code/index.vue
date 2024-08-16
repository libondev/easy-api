<route>
  meta:
    title: Parse Code
</route>

<!-- eslint-disable regexp/no-trivially-nested-quantifier -->
<script lang="ts" setup>
import qs from 'query-string'
import { useRouter } from 'vue-router'
import { setCurrentRequest } from '@/constants/request.ts'
import type { RequestConfigure, RequestConfigures } from '@/types/request.ts'

const requestString = shallowRef('')

const unresolvedHeaderKeys = ['user-agent', 'referer', 'sec-ch-ua', 'sec-ch-ua-mobile', 'sec-fetch-mode', 'sec-ch-ua-platform', 'sec-fetch-dest', 'sec-fetch-site']

const parseFetchStringRegex = /fetch\("([^"]+)"\s*,\s*(\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})\s*\);/

const router = useRouter()

function onParseRequest() {
  if (!requestString.value) {
    return
  }

  const matchedResult = requestString.value.match(parseFetchStringRegex)

  if (!matchedResult) {
    useToast.error('Exception occurred in parsing. Please confirm whether the string is correct and complete.')

    return
  }

  const [, rawUrl, optionsString] = matchedResult
  const { headers: rawHeaders, ...options } = JSON.parse(optionsString)

  const method = options.method || 'GET'

  const [url, queryString] = rawUrl.split('?')

  const headers = Object.entries(rawHeaders).reduce((list, [key, value]) => {
    if (unresolvedHeaderKeys.includes(key.toLowerCase())) {
      return list
    }

    list.push({
      key,
      value: value as string,
      enable: true,
      isCustom: true,
    } as RequestConfigure)

    return list
  }, [] as RequestConfigures)

  const queries = Object.entries(queryString ? qs.parse(queryString) : {}).reduce((list, [key, value]) => {
    list.push({
      key,
      value: value as string,
      enable: true,
    })

    return list
  }, [] as RequestConfigures)

  const body = (() => {
    try {
      const parsedBody = JSON.parse(options.body)

      if (typeof parsedBody === 'object') {
        return Object.entries(parsedBody).reduce((list, [key, value]) => {
          list.push({
            key,
            value: JSON.stringify(value),
            enable: true,
          })

          return list
        }, [] as RequestConfigures)
      }
    } catch {
      return options.body
    }
  })()

  const requestDetails = {
    ...options,
    url,
    body,
    method,
    headers,
    queries,
    bodyType: typeof body === 'object' ? 'JSON' : 'Text',
  }

  setCurrentRequest(requestDetails)

  useToast.success('Parse request successful.')

  router.replace('/dashboard')
}
</script>

<template>
  <div class="p-12">
    <div class="mb-3 flex items-center justify-between">
      <div>
        Fetch
      </div>

      <Button @click="onParseRequest">
        Parse
      </Button>
    </div>

    <Textarea
      v-model="requestString"
      class="font-mono !min-h-96"
      placeholder="Paste the fetch string here and click the parse button."
      name="request-string"
    />
  </div>
</template>
