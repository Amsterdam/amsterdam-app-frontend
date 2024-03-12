import {type ReactNode} from 'react'
import {useDeviceRegistration} from '@/hooks/useDeviceRegistration'
import {useForegroundPushNotificationHandler} from '@/hooks/useForegroundPushNotificationHandler'
import {useModules} from '@/hooks/useModules'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'
import {useLogGeneralAnalytics} from '@/processes/piwik/hooks/useLogGeneralAnalytics'
import {useSetupSentry} from '@/processes/sentry/hooks/useSetupSentry'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {enabledModules} = useModules()

  useCheckLocationPermission()
  useForegroundPushNotificationHandler()
  useLogGeneralAnalytics()
  useDeviceRegistration()
  useSetupSentry()

  return (
    <>
      {enabledModules?.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
    </>
  )
}
