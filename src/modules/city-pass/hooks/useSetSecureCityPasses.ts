import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {CityPassResponse, SecureCityPass} from '@/modules/city-pass/types'
import {useAlert} from '@/store/slices/alert'
import {SecureItemKey} from '@/utils/secureStorage'

const transformResponse = (data: CityPassResponse) =>
  data.reduce((acc: SecureCityPass[], item) => {
    const newItem = {
      d: item.dateEndFormatted,
      f: item.owner.firstname,
      l: item.owner.lastname,
      p: item.passNumberComplete,
    }

    return [...acc, newItem]
  }, [])

export const useSetSecureCityPasses = (accessToken: string | null) => {
  const {setAlert} = useAlert()
  const setSecureItem = useSetSecureItem()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered) // true if the user successfully completed the DigiD login and the administration number is registered with the access-token in the city-pass backend

  const {data, isLoading} = useGetCityPassesQuery(
    accessToken && isCityPassOwnerRegistered ? accessToken : skipToken,
  )

  useEffect(() => {
    if (data) {
      void setSecureItem(
        SecureItemKey.cityPasses,
        JSON.stringify(transformResponse(data)),
      ).then(() => {
        setAlert({
          variant: AlertVariant.positive,
          text: 'Je Stadspas gegevens zijn opgehaald.',
          title: 'Gelukt!',
          hasIcon: true,
          hasCloseIcon: true,
          testID: 'CityPassLoggedInAlertPositive',
        })
      })
    }
  }, [data, setAlert, setSecureItem])

  return {isLoading}
}
