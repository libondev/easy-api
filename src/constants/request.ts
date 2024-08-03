// import type { InjectionKey } from 'vue'
import localforage from 'localforage'

export const METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const

export const DEFAULT_REQUEST_CONFIG_INJECTION_KEY = 'defaultConfig' as unknown as InjectionKey<Ref<DefaultConfig>>

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

export type RequestHeaders = Array<{ key: string, value: string, enable: boolean }>

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
  })
}

export function setLocaleHeaders(headers: RequestHeaders) {
  localforage.setItem('headersConfig', headers)
}

export type RequestEnvironments = Array<{ name: string, id: string }>

export function getLocaleEnvironments() {
  return new Promise<RequestEnvironments>((resolve) => {
    localforage
      .getItem<RequestEnvironments>('environmentsConfig')
      .then((res) => {
        if (!res) {
          res = [{ name: 'EXAMPLE', id: 'https://jsonplaceholder.typicode.com' }]
          setLocaleEnvironments(res)
        }

        resolve(res)
      })
  })
}

export function setLocaleEnvironments(environments: RequestEnvironments) {
  localforage.setItem('environmentsConfig', environments)
}
