import {useCallback} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {SecureItemKey} from '@/utils/secureStorage'

export const useSetSecureParkingAccount = () => {
  const setSecureItem = useSetSecureItem()

  return useCallback(
    (data: SecureParkingAccount) => {
      void setSecureItem(
        data.scope === ParkingPermitScope.permitHolder
          ? SecureItemKey.parkingPermitHolder
          : SecureItemKey.parkingVisitor,
        JSON.stringify(data),
      )
    },
    [setSecureItem],
  )
}
