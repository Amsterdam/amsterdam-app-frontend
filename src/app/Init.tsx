import {ReactNode, useMemo} from 'react'
import {AppStateStatus} from 'react-native'
import {
  useAppState,
  useInitSentry,
  useModules,
  usePiwik,
  useRegisterDevice,
  useSentry,
} from '@/hooks'
import {getPushNotificationsPermission} from '@/processes'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useInitSentry()
  const piwik = usePiwik()
  const {sendSentryErrorLog} = useSentry()
  const {registerDevice, unregisterDevice} = useRegisterDevice()
  const {selectedModules} = useModules()

  const onAppstate = useMemo(
    () => ({
      onForeground: () => {
        if (selectedModules.some(module => module.requiresFirebaseToken)) {
          getPushNotificationsPermission()
            .then(registerDevice)
            .catch((error: unknown) => {
              sendSentryErrorLog(
                'Register device for push notifications failed',
                'Init.tsx',
                {error},
              )
            })
        } else {
          void unregisterDevice(undefined)
        }
      },
      onChange: (nextAppState: AppStateStatus) => {
        void piwik?.trackCustomEvent('appStateChange', nextAppState)
      },
    }),
    [
      piwik,
      registerDevice,
      selectedModules,
      sendSentryErrorLog,
      unregisterDevice,
    ],
  )

  useAppState(onAppstate)

  return (
    <>
      {selectedModules.map(m => {
        const {PreRenderComponent} = m
        return PreRenderComponent ? <PreRenderComponent key={m.slug} /> : null
      })}
      {children}
    </>
  )
}
