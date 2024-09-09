import {ThunkDispatch} from '@reduxjs/toolkit'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {setAlertAction} from '@/store/slices/alert'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (
  /**
   * show alert after logout
   */
  alert: boolean,
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
    setTimeout(
      () =>
        dispatch(
          setAlertAction({
            variant: AlertVariant.warning,
            text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
            title: 'Uitgelogd',
            hasIcon: true,
            hasCloseIcon: true,
            testID: 'CityPassLoggedOutAlert',
          }),
        ),
      100,
    )
  }
}
