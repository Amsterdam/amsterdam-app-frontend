import {ReactNode, useMemo} from 'react'
import {AppStateStatus} from 'react-native'
import {
  useAppState,
  useForegroundPushNotificationHandler,
  useInitSentry,
  useModules,
  usePiwik,
  useRegisterDevice,
} from '@/hooks'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  useInitSentry()
  const piwik = usePiwik()
  const {registerDeviceWithPermission, unregisterDevice} = useRegisterDevice()
  const {selectedModules} = useModules()

  const onAppstate = useMemo(
    () => ({
      onForeground: () => {
        if (selectedModules.some(module => module.requiresFirebaseToken)) {
          registerDeviceWithPermission()
        } else {
          void unregisterDevice(undefined)
        }
      },
      onChange: (nextAppState: AppStateStatus) => {
        void piwik?.trackCustomEvent('appStateChange', nextAppState)
      },
    }),
    [piwik, registerDeviceWithPermission, selectedModules, unregisterDevice],
  )

  useAppState(onAppstate)

  return (
    <>
      {selectedModules.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
    </>
  )
}
