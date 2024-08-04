import type { REQUEST_METHODS, RequestConfigures } from '@/constants/request'

export interface RequestDetails {
  url: string
  body?: any
  method?: typeof REQUEST_METHODS[number]
  headers?: RequestConfigures
  queries?: RequestConfigures
}

export interface RequestResults {
  code: number
  text: string
  durations: number
}
