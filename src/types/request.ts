import type { METHODS } from '@/constants/request'

export interface RequestDetail {
  url: string
  method?: typeof METHODS[number]
  headers?: Record<string, string>
}

export interface RequestStatus {
  code: number
  durations: number
}

export type RequestResult = unknown
