import React, {ReactNode} from 'react'
import {useInitSentry, useRegisterDevice, useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {useConstructionWorkEditorCredentials} from '@/modules/construction-work-editor/hooks'
import {getPushNotificationsPermission} from '@/processes'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  useInitSentry()
  const {sendSentryErrorLog} = useSentry()
  const {registerDevice} = useRegisterDevice()

  useAppState({
    onForeground: () => {
      getPushNotificationsPermission()
        .then(registerDevice)
        .catch((error: unknown) => {
          sendSentryErrorLog(
            'Register device for push notifications failed',
            'Init.tsx',
            {error},
          )
        })
    },
  })

  useConstructionWorkEditorCredentials()

  return <>{children}</>
}
