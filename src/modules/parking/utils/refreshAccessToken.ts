import {type ReduxDispatch} from '@/hooks/redux/types'
import {parkingApi} from '@/modules/parking/service'
import {setAccessTokenExpiration} from '@/modules/parking/slice'
import {
  ParkingEndpointName,
  ParkingPermitScope,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'
import {logout} from '@/modules/parking/utils/logout'
import {setSecureParkingAccount} from '@/modules/parking/utils/setSecureParkingAccount'
import {devLog, devError} from '@/processes/development'
import {setSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {type RootState} from '@/store/types/rootState'
import {SecureItemKey} from '@/utils/secureStorage'

const saveParkingAccount = (
  account: SecureParkingAccount,
  accessTokenExpiration: string,
  dispatch: ReduxDispatch,
  failRetry: (e: unknown) => void,
  resolve: (
    value: SecureParkingAccount | PromiseLike<SecureParkingAccount>,
  ) => void,
  reject: (reason?: unknown) => void,
) => {
  dispatch(setAccessTokenExpiration(accessTokenExpiration))
  setSecureParkingAccount(account).then(
    () => {
      dispatch(
        setSecureItemUpdatedTimestamp(
          account.scope === ParkingPermitScope.permitHolder
            ? SecureItemKey.parkingPermitHolder
            : SecureItemKey.parkingVisitor,
        ),
      )
      devLog('Token parking account successful refreshed')
      failRetry('New token, so old request should fail')
      resolve(account)
    },
    () => {
      devError('Token parking account save failed')
      reject(new Error('New token could not be saved'))
    },
  )
}

export const refreshAccessToken = (
  currentAccountType: ParkingPermitScope | undefined,
  dispatch: ReduxDispatch,
  state: RootState,
  failRetry: (e?: unknown) => void,
): Promise<SecureParkingAccount> =>
  new Promise((resolve, reject) => {
    if (!currentAccountType) {
      devError('No account type provided')
      reject(new Error('No account type provided  '))

      return
    }

    void getSecureParkingAccount(currentAccountType).then(account => {
      if (account) {
        dispatch(
          parkingApi.endpoints[ParkingEndpointName.login].initiate({
            pin: account.pin,
            report_code: account.reportCode,
          }),
        )
          .unwrap()
          .then(
            ({access_token, access_token_expiration}) =>
              saveParkingAccount(
                {...account, accessToken: access_token},
                access_token_expiration,
                dispatch,
                failRetry,
                resolve,
                reject,
              ),
            () => {
              void logout(false, dispatch, state)
              devError('Token refresh failed, you are now logged out')
              failRetry('Session ended')
              reject(new Error('Token refresh failed'))
            },
          )
      }
    })
  })
