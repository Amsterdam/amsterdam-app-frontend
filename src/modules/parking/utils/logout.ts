import {Dispatch} from '@reduxjs/toolkit'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'
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

  await removeSecureItems([key])
  dispatch(parkingSlice.actions.setCurrentAccountType(undefined))
  dispatch(deleteSecureItemUpdatedTimestamp(key))

  // invalidate the parking data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
  setTimeout(() => {
    dispatch(parkingApi.util.invalidateTags(['Parking']))
  }, 1000)
}
