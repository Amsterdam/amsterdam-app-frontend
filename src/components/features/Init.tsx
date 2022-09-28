import React, {ReactNode, useMemo} from 'react'
import {
  useAppState,
  useInitSentry,
  useModules,
  useRegisterDevice,
  useSentry,
} from '@/hooks'
import {useConstructionWorkEditorCredentials} from '@/modules/construction-work-editor/hooks'
import {getPushNotificationsPermission} from '@/processes'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useInitSentry()
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
          // eslint-disable-next-line no-void
          void unregisterDevice(undefined)
        }
      },
    }),
    [registerDevice, selectedModules, sendSentryErrorLog, unregisterDevice],
  )

  useAppState(onAppstate)

  useConstructionWorkEditorCredentials()

  return <>{children}</>
}
