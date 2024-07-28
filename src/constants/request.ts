import type { InjectionKey } from 'vue'

export const METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const

export const DEFAULT_REQUEST_CONFIG_INJECTION_KEY = 'defaultConfig' as unknown as InjectionKey<Ref<ReturnType<typeof getDefaultRequestConfig>>>

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
