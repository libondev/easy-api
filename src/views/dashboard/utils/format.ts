import type { RequestHeaders } from '@/constants/request'

export function formatRequestAddress(url: string) {
  if (!url) {
    return ''
  }

  return url.replace(/#\{.*?key:(.*?)\}/g, '$1')
}

export function formatRequestOptions(headers: RequestHeaders) {
  return headers.reduce((map, item) => {
    if (item.enable) {
      map[item.key] = item.value
    }

    return map
  }, {} as Record<string, string>)
}

export function getQueryStringFromObject(queries: Record<string, any>) {
  const _params = new URLSearchParams(queries)

  if (_params.size) {
    return `?${_params.toString()}`
  }

  return ''
}
