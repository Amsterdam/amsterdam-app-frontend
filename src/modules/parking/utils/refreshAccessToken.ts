import {ThunkDispatch} from '@reduxjs/toolkit'
import {parkingApi} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingPermitScope,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'
import {setSecureParkingAccount} from '@/modules/parking/utils/setSecureParkingAccount'
import {devLog, devError} from '@/processes/development'
import {setSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {SecureItemKey} from '@/utils/secureStorage'

const saveParkingAccount = (
  account: SecureParkingAccount,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>,
  failRetry: (e: unknown) => void,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: unknown) => void,
) => {
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
      resolve()
    },
    () => {
      devError('Token parking account save failed')
      reject(new Error('New token could not be saved'))
    },
  )
}

export const refreshAccessToken = (
  currentAccountType: ParkingPermitScope | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>,
  failRetry: (e?: unknown) => void,
): Promise<void> =>
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
            ({access_token}) =>
              saveParkingAccount(
                {...account, accessToken: access_token},
                dispatch,
                failRetry,
                resolve,
                reject,
              ),
            () => {
              devError('Token refresh failed, you are now logged out')
              failRetry('Session ended')
              reject(new Error('Token refresh failed'))
            },
          )
      }
    })
  })
