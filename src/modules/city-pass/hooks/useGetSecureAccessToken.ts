import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

export const useGetSecureAccessToken = () => {
  const {item: secureAccessToken, isLoading} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  return {
    secureAccessToken,
    isLoading,
  }
}
