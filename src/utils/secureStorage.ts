import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage'
import {appInsights} from '@/providers/appinsights.provider'

export enum SecureItemKey {
  accessCode = 'accessCode',
  cityPassAccessToken = 'cityPassAccessToken',
  cityPassRefreshToken = 'cityPassRefreshToken',
  cityPasses = 'cityPasses',
  wasteCardNumber = 'wasteCardNumber',
}

export const setSecureItem = (key: SecureItemKey, value: string) =>
  new Promise((resolve, reject) => {
    RNSecureStorage.setItem(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    })
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })

export const getSecureItem = (key: SecureItemKey): Promise<string | null> =>
  new Promise((resolve, reject) => {
    RNSecureStorage.getItem(key)
      .then(res => resolve(res))
      .catch(reject)
  })

export const isSetSecureItem = (key: SecureItemKey): Promise<boolean> =>
  new Promise((resolve, reject) => {
    RNSecureStorage.exist(key)
      .then(res => resolve(!!res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })

export const removeSecureItems = (keys: SecureItemKey[]) =>
  new Promise((resolve, reject) => {
    RNSecureStorage.multiRemove(keys)
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })

export const removeAllSecureItems = () =>
  new Promise((resolve, reject) => {
    RNSecureStorage.clear()
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })
