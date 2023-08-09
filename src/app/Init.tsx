import {ReactNode, useMemo} from 'react'
import {AppStateStatus} from 'react-native'
import {useInitSentry} from '@/hooks/sentry/useInitSentry'
import {useAppState} from '@/hooks/useAppState'
import {useForegroundPushNotificationHandler} from '@/hooks/useForegroundPushNotificationHandler'
import {useModules} from '@/hooks/useModules'
import {usePiwik} from '@/hooks/usePiwik'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  useInitSentry()
  const piwik = usePiwik()
  const {registerDeviceWithPermission, unregisterDevice} =
    useRegisterDevice(false)
  const {enabledModules} = useModules()

  const onAppState = useMemo(
    () => ({
      onForeground: () => {
        if (enabledModules?.some(module => module.requiresFirebaseToken)) {
          registerDeviceWithPermission()
        } else {
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

  return (
    <>
      {enabledModules?.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
    </>
  )
}
