import {
  AuthenticationType,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import {useState, useEffect, useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {accessCodeSlice, selectUseBiometrics} from '@/modules/access-code/slice'
import {appInsights} from '@/providers/appinsights.provider'

export const useAccessCodeBiometrics = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const useBiometrics = useSelector(selectUseBiometrics)

  const [biometricsAuthenticationType, setBiometricsAuthenticationType] =
    useState<AuthenticationType[]>()

  const setUseBiometrics = useCallback(
    (permission: boolean) =>
      dispatch(accessCodeSlice.actions.setUseBiometrics(permission)),
    [dispatch],
  )

  useEffect(() => {
    const fetchBiometricsAuthenticationType = async () => {
      setIsLoading(true)

      try {
        const type = await supportedAuthenticationTypesAsync()

        setBiometricsAuthenticationType(type)
      } catch (err) {
        appInsights.trackException({
          exception: err as Error,
        })
      }

      setIsLoading(false)
    }

    void fetchBiometricsAuthenticationType()
  }, [])

  return {
    biometricsAuthenticationType,
    isLoading,
    setUseBiometrics,
    useBiometrics,
  }
}
