import type { RequestConfigures } from '@/constants/request'

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

  return headers.reduce((map, item) => {
    if (item.enable) {
      map[item.key] = item.value
    }

    return map
  }, {} as Record<string, string>)
}

export function getQueryStringFromObject(queries?: Record<string, any>) {
  if (!queries) {
    return ''
  }

  const _params = new URLSearchParams(queries)

  if (_params.size) {
    return `?${_params.toString()}`
  }

  return ''
}
