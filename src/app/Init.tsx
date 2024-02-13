import {ReactNode, useEffect, useMemo} from 'react'
import {useAppState} from '@/hooks/useAppState'
import {useForegroundPushNotificationHandler} from '@/hooks/useForegroundPushNotificationHandler'
import {useModules} from '@/hooks/useModules'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useResetLocationPermissionForAndroid} from '@/modules/address/hooks/useResetLocationPermissionForAndroid'
import {
  PiwikAction,
  useLogGeneralAnalytics,
} from '@/processes/piwik/hooks/useLogGeneralAnalytics'
import {useSetupSentry} from '@/processes/sentry/hooks/useSetupSentry'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {logGeneralAnalytics, ready} = useLogGeneralAnalytics()

  useForegroundPushNotificationHandler()
  useSetupSentry()
  const {registerDeviceWithPermission, unregisterDevice} =
    useRegisterDevice(false)
  const {enabledModules} = useModules()

  useEffect(() => {
    logGeneralAnalytics(PiwikAction.startUp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  const appStateHandlers = useMemo(
    () => ({
      onForeground: () => {
        logGeneralAnalytics()

        if (enabledModules?.some(module => module.requiresFirebaseToken)) {
          registerDeviceWithPermission() // Because tokens refresh regularly, we need to re-register regularly
        } else {
          /* When the user has disabled all modules that require a Firebase token,
          we unregister the device so the user stops receiving push notifications */
          void unregisterDevice(undefined)
        }
      },
    }),
    [
      enabledModules,
      logGeneralAnalytics,
      registerDeviceWithPermission,
      unregisterDevice,
    ],
  )

  useAppState(appStateHandlers)

  useResetLocationPermissionForAndroid()

  return (
    <>
      {enabledModules?.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
    </>
  )
}
