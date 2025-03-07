import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {SecureItemKey} from '@/utils/secureStorage'

export const useGetSecureParkingAccount = () => {
  const {currentAccountType} = useCurrentParkingAccount()
  const {item, isLoading} = useGetSecureItem(
    currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor,
  )

  return {
    secureParkingAccount: item
      ? (JSON.parse(item) as SecureParkingAccount)
      : undefined,
    isLoading,
  }
}
