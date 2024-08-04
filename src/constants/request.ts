// import type { InjectionKey } from 'vue'
import localforage from 'localforage'
import type { RequestDetail } from '@/types/request'

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

export interface RequestConfigure { key: string, value: string, enable: boolean }
export type RequestConfigures = RequestConfigure[]

export type RequestEnvironments = Array<{ value: string, key: string }>

function getDefaultConfig() {
  const config: RequestInit = {
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    credentials: 'include',
    referrerPolicy: 'no-referrer-when-downgrade',
  }

  return config
}

export function getCurrentRequest() {
  return new Promise<RequestDetail>((resolve) => {
    localforage
      .getItem<RequestDetail>('currentRequest')
      .then((res) => {
        if (!res) {
          res = {
            url: '#{value:EXAMPLE,key:https://jsonplaceholder.typicode.com}/todos/1',
            body: null,
            headers: [],
            queries: [],
          }
          setCurrentRequest(res)
        }

        resolve(res)
      })
  })
}

export function setCurrentRequest(request: RequestDetail) {
  localforage.setItem('currentRequest', request)
}

export function getLocaleHeaders() {
  return new Promise<RequestConfigures>((resolve) => {
    localforage
      .getItem<RequestConfigures>('headersConfig')
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

export function setLocaleHeaders(headers: RequestConfigures) {
  localforage.setItem('headersConfig', headers)
}

export function getLocaleDefaultConfig() {
  return new Promise<RequestInit>((resolve) => {
    localforage
      .getItem<RequestInit>(DEFAULT_REQUEST_CONFIG_INJECTION_KEY as unknown as string)
      .then((res) => {
        if (!res) {
          res = getDefaultConfig()
          setLocaleDefaultConfig(res)
        }

        resolve(res)
      })
  })
}

export function setLocaleDefaultConfig(config: RequestInit) {
  localforage.setItem(DEFAULT_REQUEST_CONFIG_INJECTION_KEY as unknown as string, config)
}

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
