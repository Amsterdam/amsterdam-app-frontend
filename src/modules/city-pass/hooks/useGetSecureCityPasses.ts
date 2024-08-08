import {useEffect, useState} from 'react'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {CityPassPass, SecureCityPass} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

const transformResponse = (cityPasses: SecureCityPass[]) =>
  cityPasses.reduce((acc: CityPassPass[], item) => {
    const newItem = {
      dateEndFormatted: item.d,
      firstname: item.f,
      ...(item.i && {infix: item.i}),
      lastname: item.l,
      passNumberComplete: item.p,
    }

    return [...acc, newItem]
  }, [])

export const useGetSecureCityPasses = () => {
  const [cityPasses, setCityPasses] = useState<SecureCityPass[]>([])
  const {item: secureCityPasses} = useGetSecureItem(SecureItemKey.cityPasses)

  useEffect(() => {
    if (secureCityPasses) {
      const parsedCityPasses = JSON.parse(secureCityPasses) as SecureCityPass[]

      setCityPasses(parsedCityPasses)
    }
  }, [secureCityPasses])

  return transformResponse(cityPasses)
}
