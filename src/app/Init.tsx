import {ReactNode, useMemo} from 'react'
import {AppStateStatus} from 'react-native'
import {useAppState} from '@/hooks/useAppState'
import {useForegroundPushNotificationHandler} from '@/hooks/useForegroundPushNotificationHandler'
import {useModules} from '@/hooks/useModules'
import {usePiwik} from '@/hooks/usePiwik'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useResetLocationPermissionForAndroid} from '@/modules/address/hooks/useResetLocationPermissionForAndroid'
import {useSetupSentry} from '@/processes/sentry/hooks/useSetupSentry'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  useSetupSentry()
  const piwik = usePiwik()
  const {registerDeviceWithPermission, unregisterDevice} =
    useRegisterDevice(false)
  const {enabledModules} = useModules()

  const onAppState = useMemo(
    () => ({
      onForeground: () => {
        if (enabledModules?.some(module => module.requiresFirebaseToken)) {
          registerDeviceWithPermission() // Because tokens refresh regularly, we need to re-register regularly
        } else {
          /* When the user has disabled all modules that require a Firebase token,
          we unregister the device so the user stops receiving push notifications */
          void unregisterDevice(undefined)
        }
      },
      onChange: (nextAppState: AppStateStatus) => {
        void piwik?.trackCustomEvent('appStateChange', nextAppState)
      },
    }),
    [enabledModules, piwik, registerDeviceWithPermission, unregisterDevice],
  )

  useAppState(onAppState)

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
