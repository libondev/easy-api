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

export type Environments = Array<{ label: string, value: string }>

export function getDefaultRequestConfig() {
  return {
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    credentials: 'include',
    referrerPolicy: 'no-referrer-when-downgrade',
  }
}

export async function getLocaleEnvironments() {
  return new Promise<Environments>((resolve) => {
    localforage
      .getItem<Environments>('environmentsConfig')
      .then((res) => {
        if (!res) {
          res = [{ label: 'EXAMPLE', value: 'https://jsonplaceholder.typicode.com' }]
          setLocaleEnvironments(res)
        }

        resolve(res)
      })
  })
}

export function setLocaleEnvironments(environments: Environments) {
  localforage.setItem('environmentsConfig', environments)
}
