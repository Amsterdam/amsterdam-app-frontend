import {type ReduxDispatch} from '@/hooks/redux/types'
import {parkingApi} from '@/modules/parking/service'
import {
  parkingSlice,
  setShouldShowLoginScreenAction,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {type RootState} from '@/store/types/rootState'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (
  shouldShowLoginScreen: boolean,
  dispatch: ReduxDispatch,
  state: RootState,
) => {
  const key =
    state.parking.parkingAccount?.scope === ParkingPermitScope.visitor
      ? SecureItemKey.parkingVisitor
      : SecureItemKey.parkingPermitHolder

  await removeSecureItems([key])
  dispatch(parkingSlice.actions.setParkingAccount(undefined))
  dispatch(deleteSecureItemUpdatedTimestamp(key))
  shouldShowLoginScreen && dispatch(setShouldShowLoginScreenAction(true))

  // invalidate the parking data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
  setTimeout(() => {
    dispatch(parkingApi.util.resetApiState())
  }, 1000)
}
