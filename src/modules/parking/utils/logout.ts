import {Dispatch} from '@reduxjs/toolkit'
import {ParkingPermitScope} from '@/modules/parking/types'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (
  currentAccountType: ParkingPermitScope,
  dispatch: Dispatch,
) => {
  const key =
    currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor

  dispatch(deleteSecureItemUpdatedTimestamp(key))

  return removeSecureItems([key])
}
