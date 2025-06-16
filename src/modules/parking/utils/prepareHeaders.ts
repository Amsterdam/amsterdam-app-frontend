import {
  selectAccessToken,
  selectAccessTokenExpiration,
  selectParkingAccount,
} from '@/modules/parking/slice'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {PrepareHeaders} from '@/services/types'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState
  const accessTokenExpiration = dayjs(selectAccessTokenExpiration(state))
  const account = selectParkingAccount(state)

  if (!account) {
    return headers
  }

  let accessToken = selectAccessToken(state)

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (accessTokenExpiration.isBefore(nowPlusMinute)) {
    const newAccessToken = await refreshAccessToken(
      account.reportCode,
      account.scope,
      dispatch,
      state,
      () => null,
    )

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('SSP-Access-Token', accessToken)
  }

  return headers
}
