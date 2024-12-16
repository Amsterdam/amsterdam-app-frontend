import {useCallback, useEffect, useState} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {cityPassExternalLinks} from '@/modules/city-pass/external-links'
import {useCreateSecureAccessToken} from '@/modules/city-pass/hooks/useCreateSecureAccessToken'
import {SecureItemKey} from '@/utils/secureStorage'

export const useLogin = () => {
  const [openUrl, setOpenUrl] = useState(false)
  const openWebUrl = useOpenWebUrl()
  const loginUrl = useUrlForEnv(cityPassExternalLinks)
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const createSecureAccessToken = useCreateSecureAccessToken()

  useEffect(() => {
    if (secureAccessToken && openUrl) {
      openWebUrl(`${loginUrl}${secureAccessToken}`) // Re-enters the app with a deeplink when finished
      setOpenUrl(false)
    }
  }, [loginUrl, openUrl, openWebUrl, secureAccessToken])

  return useCallback(() => {
    if (secureAccessToken) {
      openWebUrl(`${loginUrl}${secureAccessToken}`)
    } else {
      void createSecureAccessToken()
      setOpenUrl(true)
    }
  }, [secureAccessToken, createSecureAccessToken, openWebUrl, loginUrl])
}
