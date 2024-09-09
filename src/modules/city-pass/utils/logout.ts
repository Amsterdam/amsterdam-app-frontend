import {ThunkDispatch} from '@reduxjs/toolkit'
import {alerts} from '@/modules/city-pass/alerts'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {setAlertAction} from '@/store/slices/alert'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (
  /**
   * show alert after logout
   */
  alert: keyof typeof alerts | false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>,
) => {
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
}
