import { stringify } from 'qs'
import { set } from 'es-toolkit/compat'
import type { RequestConfigures } from '@/types/request'

export function formatRequestAddress(url: string) {
  if (!url) {
    return ''
  }

  return url.replace(/#\{.*?value:(.*?)\}/g, '$1')
}

export function formatRequestOptions(headers?: RequestConfigures) {
  if (!headers || !headers.length) {
    return
  }

  return headers.reduce((map, { enable, key, value, dataType = 'string' }) => {
    if (enable) {
      if (dataType !== 'string') {
        try {
          value = JSON.parse(value)
        } catch {}
      }

      // map[key] = value
      set(map, key, value)
    }

    return map
  }, {} as Record<string, string>)
}

export function getQueryStringFromObject(queries?: Record<string, any>) {
  if (!queries) {
    return ''
  }

  const queryString = stringify(queries)

  if (queryString) {
    return `?${queryString}`
  }

  return ''
}
