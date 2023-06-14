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
import {Module, ModuleClientConfig} from '@/modules/types'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  useInitSentry()
  const piwik = usePiwik()
  const {registerDeviceWithPermission, unregisterDevice} = useRegisterDevice()
  const {coreModules, enabledModules} = useModules()
  const coreAndEnabledModules = useMemo<(Module | ModuleClientConfig)[]>(
    () => [...coreModules, ...enabledModules],
    [coreModules, enabledModules],
  )

  const onAppstate = useMemo(
    () => ({
      onForeground: () => {
        if (
          coreAndEnabledModules.some(module => module.requiresFirebaseToken)
        ) {
          registerDeviceWithPermission()
        } else {
          void unregisterDevice(undefined)
        }
      },
      onChange: (nextAppState: AppStateStatus) => {
        void piwik?.trackCustomEvent('appStateChange', nextAppState)
      },
    }),
    [
      coreAndEnabledModules,
      piwik,
      registerDeviceWithPermission,
      unregisterDevice,
    ],
  )

  useAppState(onAppstate)

  return (
    <>
      {coreAndEnabledModules.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
    </>
  )
}
