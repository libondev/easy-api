// import type { InjectionKey } from 'vue'
import localforage from 'localforage'
import { cloneDeep } from 'es-toolkit/compat'
import type { RequestConfigure, RequestConfigures, RequestDetails } from '@/types/request.ts'

export const REQUEST_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const

const LOCALE_CACHE_KEYS = {
  CURRENT_REQUEST: 'currentRequest',
  DEFAULT_CONFIGS: 'defaultConfigs',
  HEADERS_CONFIGS: 'headersConfigs',
  VARIABLES_CONFIGS: 'variablesConfigs',
}

export const DEFAULT_REQUEST_CONFIG_INJECTION_KEY = LOCALE_CACHE_KEYS.DEFAULT_CONFIGS as unknown as InjectionKey<Ref<RequestInit>>

export function cleanAllLocaleCaches() {
  localforage.clear()
}

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
      .getItem<RequestDetails>(LOCALE_CACHE_KEYS.CURRENT_REQUEST)
      .then((res) => {
        if (!res) {
          res = {
            url: '#{key:EXAMPLE,value:https://jsonplaceholder.typicode.com}/todos/1',
            body: '',
            bodyType: 'Text',
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
  const clonedRequest = cloneDeep(request)

  if (['JSON', 'FormData'].includes(clonedRequest.bodyType!)) {
    clonedRequest.body.forEach((item: RequestConfigure) => {
      if (item.dataType === 'file') {
        item.value = ''
      }
    })
  }

  localforage.setItem(LOCALE_CACHE_KEYS.CURRENT_REQUEST, clonedRequest)
}

export function getLocaleHeaders() {
  return new Promise<RequestConfigures>((resolve) => {
    localforage
      .getItem<RequestConfigures>(LOCALE_CACHE_KEYS.HEADERS_CONFIGS)
      .then((res) => {
        if (!res) {
          res = [
            { id: '0', key: 'Content-Type', value: 'application/json; charset=UTF-8', enable: true },
            { id: '1', key: 'Content-Type', value: 'application/x-www-form-urlencoded', enable: false },
            { id: '2', key: 'Content-Type', value: 'multipart/form-data', enable: false },
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
  localforage.setItem(LOCALE_CACHE_KEYS.HEADERS_CONFIGS, headers)
}

export function getLocaleDefaultConfigs() {
  return new Promise<RequestInit>((resolve) => {
    localforage
      .getItem<RequestInit>(DEFAULT_REQUEST_CONFIG_INJECTION_KEY as unknown as string)
      .then((res) => {
        if (!res) {
          res = getDefaultConfig()
          setLocaleDefaultConfigs(res)
        }

        resolve(res)
      })
  })
}

export function setLocaleDefaultConfigs(config: RequestInit) {
  localforage.setItem(DEFAULT_REQUEST_CONFIG_INJECTION_KEY as unknown as string, config)
}

export function getLocaleVariables() {
  return new Promise<RequestConfigures>((resolve) => {
    localforage
      .getItem<RequestConfigures>(LOCALE_CACHE_KEYS.VARIABLES_CONFIGS)
      .then((res) => {
        if (!res) {
          res = [{ key: 'EXAMPLE', value: 'https://jsonplaceholder.typicode.com', enable: true }]
          setLocaleVariables(res)
        }

        resolve(res)
      })
      .catch(() => {
        resolve([])
      })
  })
}

export function setLocaleVariables(environments: RequestConfigures) {
  localforage.setItem(LOCALE_CACHE_KEYS.VARIABLES_CONFIGS, environments)
}
