import { stringify } from 'qs'
import { set } from 'es-toolkit/compat'
import type { RequestConfigures, RequestDetails } from '@/types/request'

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

export function formatRequestBody(body?: any, type: RequestDetails['bodyType'] = 'Text') {
  if (!body) {
    return
  }

  switch (type) {
    case 'Text':
      return body

    case 'JSON':
      return formatRequestOptions(body)

    case 'FormUrlencoded':
      return null

    default:
      return null
  }
}

export function transformToQueryString(queries?: Record<string, any>) {
  if (!queries) {
    return ''
  }

  const queryString = stringify(queries)

  if (queryString) {
    return `?${queryString}`
  }

  return ''
}
