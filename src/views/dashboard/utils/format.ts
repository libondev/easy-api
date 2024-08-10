import { stringify } from 'qs'
import { set } from 'es-toolkit/compat'
import type { RequestConfigures, RequestDetails } from '@/types/request.ts'

export function formatRequestAddress(url: string) {
  if (!url) {
    return ''
  }

  return url.replace(/#\{.*?value:(.*?)\}/g, '$1')
}

export function formatRequestOptions(data?: RequestConfigures) {
  if (!data || !data.length) {
    return
  }

  return data.reduce((map, { enable, key, value, dataType = 'string' }) => {
    if (!enable) {
      return map
    }

    if (key) {
      if (dataType !== 'string') {
        try {
          value = JSON.parse(value)
        } catch { }
      }

      set(map, key, value)
    }

    return map
  }, {} as Record<string, string>)
}

export function formatRequestBody(
  body: any,
  method: RequestDetails['method'] = 'GET',
  type: RequestDetails['bodyType'] = 'Text',
) {
  if (!body || !body?.length) {
    return
  }

  if (['GET', 'HEAD'].includes(method)) {
    useToast('Request with GET/HEAD method cannot have body, has been ignored.')

    return
  }

  switch (type) {
    case 'Text':
      return body

    case 'JSON':
      return formatRequestOptions(body)

    // e.g. Blob/File
    case 'FormData':
      return transformToFormData(body)

    default:
      return null
  }
}

export function transformToFormData(data?: RequestConfigures) {
  const formData = new FormData()

  if (!data || !data.length) {
    return formData
  }

  data.forEach((item) => {
    if (item.key) {
      formData.append(item.key, item.value)
    }
  })

  return formData
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
