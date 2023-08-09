import NetInfo from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSentry} from '@/hooks/sentry/useSentry'
import {
  initSentry,
  setSentryBackEndEnvironment,
  setSentryUserData,
} from '@/processes/sentry'
import {BreadcrumbCategory} from '@/types/sentry'

/**
 * Initialize Sentry and related listeners and side effects
 */
export const useInitSentry = () => {
  const environment = useSelector(state => state.environment.environment)
  const {captureSentryBreadcrumb} = useSentry()

  // TODO When we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting.
  const consent = true

  useEffect(() => {
    initSentry()
  }, [])

  useEffect(() => {
    setSentryUserData(consent)
  }, [consent])

  useEffect(
    () =>
      NetInfo.addEventListener(({isConnected, isInternetReachable}) => {
        captureSentryBreadcrumb(
          'Internet connection change',
          {isConnected, isInternetReachable},
          BreadcrumbCategory.internetConnection,
        )
      }),
    [captureSentryBreadcrumb],
  )

  useEffect(() => {
    setSentryBackEndEnvironment(environment)
  }, [environment])
}
