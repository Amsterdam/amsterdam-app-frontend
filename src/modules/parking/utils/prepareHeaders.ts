import {selectAccessTokenExpiration} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
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
  const {currentAccountType} = state.parking

  const item = await getSecureItem(
    currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor,
  )
  let {accessToken} = JSON.parse(item ?? '{}') as {accessToken: string}

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (accessTokenExpiration.isBefore(nowPlusMinute)) {
    const {accessToken: newAccessToken} = await refreshAccessToken(
      currentAccountType,
      dispatch,
      () => null,
    )

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('SSP-Access-Token', accessToken)
  }

  return headers
}
