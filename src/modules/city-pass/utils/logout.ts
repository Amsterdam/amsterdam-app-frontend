import {alerts} from '@/modules/city-pass/alerts'
import {cityPassApi} from '@/modules/city-pass/service'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {setAlertAction} from '@/store/slices/alert'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {store} from '@/store/store'
import {
  getSecureItem,
  removeSecureItems,
  SecureItemKey,
} from '@/utils/secureStorage'

export const logout = async (
  /**
   * show alert after logout
   */
  alert: keyof typeof alerts | false,
  shouldLogoutMutation = false,
) => {
  const accessToken = await getSecureItem(SecureItemKey.cityPassAccessToken)

  if (!accessToken) {
    return
  }

  const dispatch = store.dispatch

  if (shouldLogoutMutation) {
    void dispatch(cityPassApi.endpoints.logout.initiate())
  }

  await removeSecureItems([
    SecureItemKey.cityPassAccessToken,
    SecureItemKey.cityPassRefreshToken,
    SecureItemKey.cityPasses,
  ])
  dispatch(deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassAccessToken))
  dispatch(deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassRefreshToken))
  dispatch(setIsCityPassOwnerRegistered(false))

  if (alert) {
    setTimeout(() => dispatch(setAlertAction(alerts[alert])), 100)
  }

  // invalidate the city pass data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
  setTimeout(() => {
    dispatch(cityPassApi.util.resetApiState())
  }, 1000)
}
