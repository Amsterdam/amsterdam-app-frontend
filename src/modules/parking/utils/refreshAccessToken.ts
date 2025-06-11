import {type ReduxDispatch} from '@/hooks/redux/types'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'
import {
  ParkingEndpointName,
  ParkingStateCurrentAccount,
} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'
import {logout} from '@/modules/parking/utils/logout'
import {devLog, devError} from '@/processes/development'

export const refreshAccessToken = (
  account: ParkingStateCurrentAccount | undefined,
  dispatch: ReduxDispatch,
  failRetry: (e?: unknown) => void,
): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (!account) {
      devError('No account provided')
      reject(new Error('No account provided'))

      return
    }

    const secureAccount = await getSecureParkingAccount(account)

    if (!secureAccount) {
      devError('No pin found for account')
      reject(new Error('No pin found for account'))

      return
    }

    dispatch(
      parkingApi.endpoints[ParkingEndpointName.login].initiate({
        pin: secureAccount.pin,
        report_code: secureAccount.reportCode,
      }),
    )
      .unwrap()
      .then(
        ({access_token, access_token_expiration}) => {
          dispatch(parkingSlice.actions.setAccessToken(access_token))
          dispatch(
            parkingSlice.actions.setAccessTokenExpiration(
              access_token_expiration,
            ),
          )
          devLog('Token parking account successful refreshed')
          failRetry('New token, so old request should fail')
          resolve(access_token)
        },
        () => {
          void logout()
          devError('Token refresh failed, you are now logged out')
          failRetry('Session ended')
          reject(new Error('Token refresh failed'))
        },
      )
  })
