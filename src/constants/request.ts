// import type { InjectionKey } from 'vue'
import localforage from 'localforage'
import { cloneDeep } from 'es-toolkit/compat'
import type { RequestConfigures, RequestDetails, RequestEnvironments } from '@/types/request'

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
  return new Promise<RequestDetails>((resolve) => {
    localforage
      .getItem<RequestDetails>('currentRequest')
      .then((res) => {
        if (!res) {
          res = {
            url: '#{key:EXAMPLE,value:https://jsonplaceholder.typicode.com}/todos/1',
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

export function setCurrentRequest(request: RequestDetails) {
  localforage.setItem('currentRequest', cloneDeep(request))
}

export function getLocaleHeaders() {
  return new Promise<RequestConfigures>((resolve) => {
    localforage
      .getItem<RequestConfigures>('headersConfig')
      .then((res) => {
        if (!res) {
          res = [
            { key: 'Content-Type', value: 'application/json; charset=UTF-8', enable: true },
            { key: 'Content-Type', value: 'application/x-www-form-urlencoded', enable: false },
            { key: 'Content-Type', value: 'multipart/form-data', enable: false },
          ]
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
