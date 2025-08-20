import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useSelector} from '@/hooks/redux/useSelector'
import {NotificationSetting} from '@/modules/user/components/NotificationSetting'
import {
  useGetDisabledPushModulesQuery,
  useGetNotificationModulesQuery,
} from '@/modules/user/service'
import {selectDisabledModules} from '@/store/slices/modules'

export const NotificationSettings = () => {
  const {data: notificationModules, isLoading: isLoadingModules} =
    useGetNotificationModulesQuery()
  const {data: disabledPushModules, isLoading: isLoadingDisabledPushModules} =
    useGetDisabledPushModulesQuery()

  const disabledModules = useSelector(selectDisabledModules)

  if (isLoadingModules || isLoadingDisabledPushModules) {
    return <PleaseWait testID="NotificationSettingsPleaseWait" />
  }

  if (!notificationModules || !disabledPushModules) {
    return (
      <SomethingWentWrong testID="NotificationSettingsSomethingWentWrong" />
    )
  }

  const activeModules = notificationModules.filter(
    ({module}) => !disabledModules.includes(module),
  )

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
