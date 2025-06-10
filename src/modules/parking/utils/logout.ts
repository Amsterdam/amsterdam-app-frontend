import {parkingApi} from '@/modules/parking/service'
import {
  parkingSlice,
  setShouldShowLoginScreenAction,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {store} from '@/store/store'
import {RootState} from '@/store/types/rootState'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (shouldShowLoginScreen = false) => {
  const state = store.getState() as RootState
  const dispatch = store.dispatch

  const key =
    state.parking.currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor

  await removeSecureItems([key])
  dispatch(parkingSlice.actions.setCurrentAccountType(undefined))
  dispatch(deleteSecureItemUpdatedTimestamp(key))
  shouldShowLoginScreen && dispatch(setShouldShowLoginScreenAction(true))

  // invalidate the parking data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
  setTimeout(() => {
    dispatch(parkingApi.util.invalidateTags(['Parking']))
  }, 1000)
}
