import NetInfo from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {useSentry} from '@/hooks'
import {
  initSentry,
  setSentryBackEndEnvironment,
  setSentryUserData,
} from '@/processes'
import {useAppSelector} from '@/store'
import {BreadcrumbCategory} from '@/types'

/**
 * Initialize Sentry and related listeners and side effects
 */
export const useInitSentry = () => {
  const environment = useAppSelector(state => state.environment.environment)
  const {captureSentryBreadcrumb} = useSentry()

  // TODO When we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting.
  const consent = true

  useEffect(() => {
    initSentry()
  }, [])

  useEffect(() => {
    setSentryUserData(consent)
  }, [consent])

  useEffect(() => {
    return NetInfo.addEventListener(({isConnected, isInternetReachable}) => {
      captureSentryBreadcrumb(
        'Internet connection change',
        {isConnected, isInternetReachable},
        BreadcrumbCategory.internetConnection,
      )
    })
  }, [captureSentryBreadcrumb])

  useEffect(() => {
    setSentryBackEndEnvironment(environment)
  }, [environment])
}
