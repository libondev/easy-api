import type { REQUEST_METHODS, RequestConfigures } from '@/constants/request'

export interface RequestDetail {
  url: string
  body?: any
  method?: typeof REQUEST_METHODS[number]
  headers?: RequestConfigures
  queries?: RequestConfigures
}

export interface RequestStatus {
  code: number
  durations: number
}

export type RequestResult = any
