import type { RequestHeaders } from '@/constants/request'

export function formatRequestUrl(url: string) {
  if (!url) {
    return ''
  }

  return url.replace(/#\{.*?id:(.*?)\}/g, '$1')
}

export function formatRequestHeaders(headers: RequestHeaders) {
  return headers.reduce((map, item) => {
    if (item.enable) {
      map[item.key] = item.value
    }

    return map
  }, {} as Record<string, string>)
}
