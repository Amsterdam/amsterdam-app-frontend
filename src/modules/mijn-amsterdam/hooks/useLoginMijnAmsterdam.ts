import {useCallback} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {loginMijnAmsterdamExternalLinks} from '@/modules/mijn-amsterdam/utils/loginMijnAmsterdamExternalLinks'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'

export const useLoginMijnAmsterdam = () => {
  const loginUrl = useUrlForEnv(loginMijnAmsterdamExternalLinks)
  const openWebUrl = useOpenWebUrl()

  return useCallback(() => {
    openWebUrl(loginUrl + SHA256EncryptedDeviceId)
  }, [loginUrl, openWebUrl])
}
