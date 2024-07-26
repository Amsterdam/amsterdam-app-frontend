import {useCallback, type ReactNode} from 'react'
import {AppInsights} from '@/app/init/AppInsights'
import {CheckPermissions} from '@/app/init/CheckPermissions'
import {DeviceRegistration} from '@/app/init/DeviceRegistration'
import {DisplayNotificationOnForeground} from '@/app/init/DisplayNotificationOnForeground'
import {GetLocation} from '@/app/init/GetLocation'
import {LogGeneralAnalytics} from '@/app/init/LogGeneralAnalytics'
import {NoInternet} from '@/components/features/NoInternet'
import {useModules} from '@/hooks/useModules'
import {clientModules} from '@/modules/modules'

type Props = {children: ReactNode}

export const Init = ({children}: Props) => {
  const {enabledModules} = useModules()

  const preRenderComponents = useCallback(() => {
    const modulesWithPreRenderComponentBeforeServerModules =
      clientModules.filter(m => m.PreRenderComponent?.renderBeforeServerModules)

    const modules =
      enabledModules ?? modulesWithPreRenderComponentBeforeServerModules

    return modules.map(({PreRenderComponent, slug}) =>
      PreRenderComponent?.Component ? (
        <PreRenderComponent.Component key={slug} />
      ) : null,
    )
  }, [enabledModules])

  return (
    <>
      <AppInsights />
      <CheckPermissions />
      <DisplayNotificationOnForeground />
      <LogGeneralAnalytics />
      <DeviceRegistration enabledModules={enabledModules} />
      <GetLocation />

      {preRenderComponents()}
      {children}
      <NoInternet />
    </>
  )
}
