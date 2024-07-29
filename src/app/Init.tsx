import {type ReactNode} from 'react'
import {AppInsights} from '@/app/init/AppInsights'
import {CheckPermissions} from '@/app/init/CheckPermissions'
import {DeviceRegistration} from '@/app/init/DeviceRegistration'
import {DisplayNotificationOnForeground} from '@/app/init/DisplayNotificationOnForeground'
import {GetLocation} from '@/app/init/GetLocation'
import {LogGeneralAnalytics} from '@/app/init/LogGeneralAnalytics'
import {PreRenderComponents} from '@/app/init/PreRenderComponents'
import {NoInternet} from '@/components/features/NoInternet'
import {useModules} from '@/hooks/useModules'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {enabledModules} = useModules()

  return (
    <>
      <AppInsights />
      <CheckPermissions />
      <DisplayNotificationOnForeground />
      <LogGeneralAnalytics />
      <DeviceRegistration enabledModules={enabledModules} />
      <GetLocation />

      <PreRenderComponents enabledModules={enabledModules} />
      {children}
      <NoInternet />
    </>
  )
}
