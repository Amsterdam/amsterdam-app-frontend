import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage'
import {appInsights} from '@/providers/appinsights.provider'

export enum SecureItemKey {
  cityPassAccessToken = 'cityPassAccessToken',
  cityPassRefreshToken = 'cityPassRefreshToken',
}

export const setSecureItem = (key: SecureItemKey, value: string) =>
  new Promise((resolve, reject) => {
    RNSecureStorage.setItem(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    })
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({})
        reject(err)
      })
  })

export const getSecureItem = (key: SecureItemKey): Promise<string | null> =>
  new Promise((resolve, reject) => {
    RNSecureStorage.getItem(key)
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({})
        reject(err)
      })
  })

export const isSetSecureItem = (key: SecureItemKey): Promise<boolean> =>
  new Promise((resolve, reject) => {
    RNSecureStorage.exist(key)
      .then(res => resolve(!!res))
      .catch((err: Error) => {
        appInsights.trackException({})
        reject(err)
      })
  })
