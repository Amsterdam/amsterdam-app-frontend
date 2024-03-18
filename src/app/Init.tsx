import {type ReactNode} from 'react'
import {useCheckPermissions} from '@/hooks/permissions/useCheckPermissions'
import {useDeviceRegistration} from '@/hooks/useDeviceRegistration'
import {useForegroundPushNotificationHandler} from '@/hooks/useForegroundPushNotificationHandler'
import {useModules} from '@/hooks/useModules'
import {useLogGeneralAnalytics} from '@/processes/piwik/hooks/useLogGeneralAnalytics'
import {useSetupSentry} from '@/processes/sentry/hooks/useSetupSentry'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {enabledModules} = useModules()

  useCheckPermissions()
  useForegroundPushNotificationHandler()
  useLogGeneralAnalytics()
  useDeviceRegistration(enabledModules)
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
