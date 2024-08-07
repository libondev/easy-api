import type { REQUEST_METHODS } from '@/constants/request'

export interface RequestDetails {
  url: string
  body?: any
  bodyType?: 'Text' | 'JSON' | 'FormData' | 'FormUrlencoded'
  method?: typeof REQUEST_METHODS[number]
  headers?: RequestConfigures
  queries?: RequestConfigures
}

export interface RequestResults {
  code: number
  text: string
  durations: number
}

export interface RequestConfigure {
  key: string
  value: string
  enable: boolean
  dataType?: 'string' | 'object' | 'array' | 'number' | 'boolean'
}
export type RequestConfigures = RequestConfigure[]

export type RequestEnvironments = Array<{ value: string, key: string }>
