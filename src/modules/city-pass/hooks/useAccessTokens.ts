import {useEffect, useMemo, useState} from 'react'
import {useGetAccessTokenQuery} from '@/modules/city-pass/service'
import {getSecureTokens} from '@/modules/city-pass/utils/getSecureTokens'
import {hasSecureTokens} from '@/modules/city-pass/utils/hasSecureTokens'
import {setSecureTokens} from '@/modules/city-pass/utils/setSecureTokens'

type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}

export const useAccessTokens = () => {
  const [tokens, setTokens] = useState<Tokens | undefined>()
  const [hasSetTokens, setHasSetTokens] = useState<boolean | undefined>()

  const {data} = useGetAccessTokenQuery(undefined, {
    skip: hasSetTokens !== false,
  })

  void useMemo(async () => {
    const hasTokens = await hasSecureTokens()

    if (hasTokens) {
      const secureTokens = await getSecureTokens()

      setTokens(secureTokens)
    }

    if (hasTokens === false) {
      setHasSetTokens(false)
    }
  }, [])

  useEffect(() => {
    if (data) {
      const {access_token, refresh_token} = data

      void setSecureTokens(access_token, refresh_token).then(() => {
        setHasSetTokens(true)
        setTokens({accessToken: access_token, refreshToken: refresh_token})
      })
    }
  }, [data])

  return tokens
}
