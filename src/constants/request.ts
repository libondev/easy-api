// import type { InjectionKey } from 'vue'
import localforage from 'localforage'

export const REQUEST_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const

export const DEFAULT_REQUEST_CONFIG_INJECTION_KEY = 'defaultConfig' as unknown as InjectionKey<Ref<RequestInit>>

export type DefaultConfig = ReturnType<typeof getDefaultRequestConfig>

export function getDefaultRequestConfig() {
  return {
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    credentials: 'include',
    referrerPolicy: 'no-referrer-when-downgrade',
  }
}

export interface RequestHeader { key: string, value: string, enable: boolean }
export type RequestHeaders = RequestHeader[]

export function getLocaleHeaders() {
  return new Promise<RequestHeaders>((resolve) => {
    localforage
      .getItem<RequestHeaders>('headersConfig')
      .then((res) => {
        if (!res) {
          res = [{ key: 'Content-Type', value: 'application/json; charset=UTF-8', enable: true }]
          setLocaleHeaders(res)
        }

        resolve(res)
      })
      .catch(() => {
        resolve([])
      })
  })
}

export function setLocaleHeaders(headers: RequestHeaders) {
  localforage.setItem('headersConfig', headers)
}

export type RequestEnvironments = Array<{ value: string, key: string }>

export function getLocaleEnvironments() {
  return new Promise<RequestEnvironments>((resolve) => {
    localforage
      .getItem<RequestEnvironments>('environmentsConfig')
      .then((res) => {
        if (!res) {
          res = [{ key: 'EXAMPLE', value: 'https://jsonplaceholder.typicode.com' }]
          setLocaleEnvironments(res)
        }

        resolve(res)
      })
      .catch(() => {
        resolve([])
      })
  })
}

export function setLocaleEnvironments(environments: RequestEnvironments) {
  localforage.setItem('environmentsConfig', environments)
}
