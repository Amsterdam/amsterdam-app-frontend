import {ThunkDispatch} from '@reduxjs/toolkit'
import {cityPassApi} from '@/modules/city-pass/service'
import {CityPassEndpointName} from '@/modules/city-pass/types'
import {getSecureTokens} from '@/modules/city-pass/utils/getSecureTokens'
import {logout} from '@/modules/city-pass/utils/logout'
import {setSecureTokens} from '@/modules/city-pass/utils/setSecureTokens'
import {devLog, devError} from '@/processes/development'
import {setSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {SecureItemKey} from '@/utils/secureStorage'

const saveTokens = (
  access_token: string,
  refresh_token: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>,
  failRetry: (e: unknown) => void,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: unknown) => void,
) => {
  setSecureTokens(access_token, refresh_token).then(
    () => {
      dispatch(setSecureItemUpdatedTimestamp(SecureItemKey.cityPassAccessToken))
      dispatch(
        setSecureItemUpdatedTimestamp(SecureItemKey.cityPassRefreshToken),
      )
      devLog('Tokens successful refreshed')
      failRetry('New tokens, so old request should fail')
      resolve()
    },
    () => {
      devError('refresh tokens save failed')
      reject(new Error('New tokens could not be saved'))
    },
  )
}

export const refreshTokens = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>,
  failRetry: (e?: unknown) => void,
): Promise<void> =>
  new Promise((resolve, reject) => {
    void getSecureTokens().then(({refreshToken}) => {
      if (refreshToken) {
        dispatch(
          cityPassApi.endpoints[CityPassEndpointName.refreshToken].initiate(
            refreshToken,
          ),
        )
          .unwrap()
          .then(
            ({access_token, refresh_token}) =>
              saveTokens(
                access_token,
                refresh_token,
                dispatch,
                failRetry,
                resolve,
                reject,
              ),
            async () => {
              devError('Token refresh failed, you are now logged out')
              await logout(dispatch)
              failRetry('Session ended')
              reject(new Error('Token refresh failed'))
            },
          )
      }
    })
  })
