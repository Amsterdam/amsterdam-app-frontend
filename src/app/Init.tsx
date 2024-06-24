import {type ReactNode} from 'react'
import {AppInsights} from '@/app/init/AppInsights'
import {GetLocation} from '@/app/init/GetLocation'
import {NoInternet} from '@/components/features/NoInternet'
import {useCheckPermissions} from '@/hooks/permissions/useCheckPermissions'
import {useDeviceRegistration} from '@/hooks/useDeviceRegistration'
import {useDisplayNotificationOnAppForeground} from '@/hooks/useDisplayNotificationOnAppForeground'
import {useModules} from '@/hooks/useModules'
import {useLogGeneralAnalytics} from '@/processes/piwik/hooks/useLogGeneralAnalytics'
import {useSetupSentry} from '@/processes/sentry/hooks/useSetupSentry'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {enabledModules} = useModules()

  useCheckPermissions()
  useDisplayNotificationOnAppForeground()
  useLogGeneralAnalytics()
  useDeviceRegistration(enabledModules)
  useSetupSentry()

  return (
    <>
      <AppInsights />
      <GetLocation />

      {enabledModules?.map(({PreRenderComponent, slug}) =>
        PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
      )}
      {children}
      <NoInternet />
    </>
  )
}
