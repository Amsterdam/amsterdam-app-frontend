import NetInfo from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {
  setSentryBackEndEnvironment,
  setSentryUserData,
} from '@/processes/sentry/init'
import {BreadcrumbKey, BreadcrumbCategory} from '@/processes/sentry/types'
import {
  getApplicationInsightsConfig,
  useAppInsights,
} from '@/providers/appinsights.provider'

/**
 * Initialize Sentry and related listeners and side effects
 */
export const useSetupSentry = () => {
  const environment = useSelector(state => state.environment.environment)
  const {captureSentryBreadcrumb} = useSentry()
  const appInsights = useAppInsights()

  // TODO When we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting.
  const consent = true

  useEffect(() => {
    setSentryUserData(consent)
  }, [consent])

  useEffect(
    () =>
      NetInfo.addEventListener(({isConnected, isInternetReachable}) => {
        captureSentryBreadcrumb(
          BreadcrumbKey.internetConnection,
          {isConnected, isInternetReachable},
          BreadcrumbCategory.internetConnection,
        )
      }),
    [captureSentryBreadcrumb],
  )

  useEffect(() => {
    setSentryBackEndEnvironment(environment)
    appInsights.updateCfg(getApplicationInsightsConfig(environment).config)
  }, [appInsights, environment])
}
