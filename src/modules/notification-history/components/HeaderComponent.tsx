import {StyleSheet, View} from 'react-native'
import simplur from 'simplur'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {notificationHistoryModule} from '@/modules/notification-history'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStatus} from '@/modules/types'
import {useGetCachedServerModule} from '@/store/slices/modules'

export const HeaderComponent = () => {
  const navigation = useNavigation()
  const cachedServerModule = useGetCachedServerModule(
    notificationHistoryModule.slug,
  )
  const isModuleInactive = cachedServerModule?.status === ModuleStatus.inactive
  const {data} = useGetNotificationsQuery(undefined, {skip: isModuleInactive})
  const styles = createStyles(isModuleInactive ? 0.7 : undefined)

  const unreadNotifications = data?.filter(({is_read}) => !is_read).length ?? 0
  const accessibilityLabel = unreadNotifications
    ? unreadNotifications +
      'ongelezen' +
      simplur`[melding|meldingen]${[unreadNotifications]}`
    : 'Meldingen'

  return (
    <View style={styles.container}>
      <IconButton
        accessibilityLabel={accessibilityLabel}
        badgeColor={isModuleInactive ? 'info' : undefined}
        badgeValue={
          isModuleInactive
            ? '!'
            : unreadNotifications > 0
              ? unreadNotifications
              : undefined
        }
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
    </View>
  )
}

const createStyles = (opacity?: number) =>
  StyleSheet.create({
    container: {
      opacity,
    },
  })
