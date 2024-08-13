import {useMemo} from 'react'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureCityPass} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

const transformResponse = (cityPasses: SecureCityPass[]) =>
  cityPasses.map(cityPass => ({
    dateEndFormatted: cityPass.d,
    firstname: cityPass.f,
    infix: cityPass.i,
    lastname: cityPass.l,
    passNumberComplete: cityPass.p,
  }))

export const useGetSecureCityPasses = () => {
  const {item: secureCityPasses} = useGetSecureItem(SecureItemKey.cityPasses)

  return useMemo(
    () =>
      secureCityPasses
        ? transformResponse(JSON.parse(secureCityPasses) as SecureCityPass[])
        : [],
    [secureCityPasses],
  )
}
