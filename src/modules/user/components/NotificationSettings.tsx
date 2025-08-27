import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useModules} from '@/hooks/useModules'
import {Module} from '@/modules/types'
import {NotificationSetting} from '@/modules/user/components/NotificationSetting'
import {
  useGetDisabledPushModulesQuery,
  useGetNotificationModulesQuery,
} from '@/modules/user/service'
import {NotificationModule} from '@/modules/user/types'

export const NotificationSettings = () => {
  const {data: notificationModules, isLoading: isLoadingModules} =
    useGetNotificationModulesQuery()
  const {data: disabledPushModules, isLoading: isLoadingDisabledPushModules} =
    useGetDisabledPushModulesQuery()

  const {enabledModules} = useModules()

  if (isLoadingModules || isLoadingDisabledPushModules) {
    return <PleaseWait testID="NotificationSettingsPleaseWait" />
  }

  if (!notificationModules || !disabledPushModules) {
    return (
      <SomethingWentWrong testID="NotificationSettingsSomethingWentWrong" />
    )
  }

  const activeModules = (enabledModules
    ?.map<NotificationModule & Partial<Module>>(enabledModule => {
      const slug = enabledModule.moduleSlug
      const notificationModule: Partial<Module> =
        notificationModules?.find(({module}) => module === slug) ?? {}

      return {
        ...enabledModule,
        ...notificationModule,
      } as NotificationModule & Partial<Module>
    })
    .filter(module => !!module.module) ?? []) as Array<
    NotificationModule & Module
  >

  return (
    <Column gutter="lg">
      {activeModules.length ? (
        activeModules.map(notificationModule => (
          <NotificationSetting
            isDisabled={disabledPushModules.includes(notificationModule.module)}
            key={notificationModule.module}
            notificationModule={notificationModule}
          />
        ))
      ) : (
        <Phrase>
          Er zijn momenteel geen onderwerpen om pushmeldingen van te ontvangen.
        </Phrase>
      )}
    </Column>
  )
}
