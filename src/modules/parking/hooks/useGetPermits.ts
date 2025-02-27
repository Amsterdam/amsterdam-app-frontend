import {skipToken} from '@reduxjs/toolkit/query'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {usePermitsQuery} from '@/modules/parking/service'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingAccount, ParkingPermitScope} from '@/modules/parking/types'
import {SecureItemKey} from '@/utils/secureStorage'

export const useGetPermits = () => {
  const {currentAccountType} = useCurrentParkingAccount()
  const {item: account} = useGetSecureItem(
    currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor,
  )

  const parsedAccount = account
    ? (JSON.parse(account) as ParkingAccount)
    : undefined

  const {data, isLoading} = usePermitsQuery(
    parsedAccount ? parsedAccount.accessToken : skipToken,
  )

  return {permits: data, isLoading}
}
