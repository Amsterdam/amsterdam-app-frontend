import {useCallback} from 'react'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {useSetCityPassOwnerIsRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const useLogout = () => {
  const setCityPassRegistered = useSetCityPassOwnerIsRegistered()
  const removeSecureItems = useRemoveSecureItems()
  // TODO: Call API to delete the user from the server once the API is available

  return useCallback(() => {
    setCityPassRegistered(false)

    return removeSecureItems([
      SecureItemKey.cityPassAccessToken,
      SecureItemKey.cityPassRefreshToken,
      SecureItemKey.cityPasses,
    ])
  }, [removeSecureItems, setCityPassRegistered])
}
