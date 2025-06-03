import {
  selectAccessTokenExpiration,
  selectRefreshTokenExpiration,
} from '@/modules/city-pass/slice'
import {refreshTokens} from '@/modules/city-pass/utils/refreshTokens'
import {PrepareHeaders} from '@/services/types'
import {RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState
  const accessTokenExpiration = dayjs(selectAccessTokenExpiration(state))
  const refreshTokenExpiration = dayjs(selectRefreshTokenExpiration(state))

  let accessToken = await getSecureItem(SecureItemKey.cityPassAccessToken)

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (
    accessTokenExpiration.isBefore(nowPlusMinute) ||
    refreshTokenExpiration.isBefore(nowPlusMinute)
  ) {
    const {accessToken: newAccessToken} = await refreshTokens(dispatch)

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('Access-Token', accessToken)
  }

  return headers
}
