import type { REQUEST_METHODS } from '@/constants/request'

export interface RequestDetail {
  url: string
  method?: typeof REQUEST_METHODS[number]
  headers?: Record<string, string>
}

export interface RequestStatus {
  code: number
  durations: number
}

export type RequestResult = any
