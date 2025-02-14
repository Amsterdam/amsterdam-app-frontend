import simplur from 'simplur'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'
import {ModuleSlug} from '@/modules/slugs'

export const HeaderComponent = () => {
  const navigation = useNavigation()
  const {data} = useGetNotificationsQuery()

  const unreadNotifications = data?.filter(({is_read}) => !is_read).length ?? 0
  const accessibilityLabel = unreadNotifications
    ? unreadNotifications +
      'ongelezen' +
      simplur`[melding|meldingen]${[unreadNotifications]}`
    : 'Meldingen'

  return (
    <IconButton
      accessibilityLabel={accessibilityLabel}
      badgeValue={unreadNotifications > 0 ? unreadNotifications : undefined}
      icon={
        <Icon
          color="link"
          name="alarmFilled"
          size="lg"
          testID="HeaderNotificationHistoryIcon"
        />
      }
      onPress={() => navigation.navigate(ModuleSlug['notification-history'])}
      testID="HeaderNotificationHistoryButton"
    />
  )
}
