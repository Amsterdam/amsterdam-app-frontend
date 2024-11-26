import {StyleSheet, View} from 'react-native'
import {createPathFromNotification} from '@/app/navigation/linking'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Badge} from '@/components/ui/feedback/Badge'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {Notification} from '@/modules/notification-history/types'
import {Module} from '@/modules/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'

type Props = {
  enabledModules: Module[] | undefined
  item: Notification
}

export const NotificationHistoryItem = ({
  item: {title, body, module_slug, created_at, is_read, id, context},
  enabledModules = [],
}: Props) => {
  const module = enabledModules.find(({slug}) => slug === module_slug)
  const styles = useThemable(createStyles)

  const openUrl = useOpenUrl()

  if (!module) {
    return null
  }

  const {icon} = module
  const createdAt = formatHistoryDateTime(created_at)

  return (
    <PressableBase
      accessibilityLabel={accessibleText(
        !is_read ? 'Ongelezen bericht: ' : undefined,
        title,
        body,
        `ontvangen: ${createdAt}`,
      )}
      onPress={() => {
        const deeplinkUrl = createPathFromNotification({
          title,
          body,
          data: context,
        })

        if (deeplinkUrl) {
          void openUrl(deeplinkUrl)
        }
      }}
      testID={`NotificationHistoryItem${id}Button`}>
      <Box
        insetHorizontal="md"
        insetVertical="smd">
        <Row gutter="sm">
          <View style={styles.iconContainer}>
            <Icon
              color="inverse"
              name={icon}
              size="xl"
              testID={`NotificationHistoryItem${id}Icon`}
            />
          </View>
          <Column
            grow={1}
            shrink={1}>
            <Row
              align="between"
              flex={1}
              gutter="sm">
              <Title
                level="h5"
                testID={`NotificationHistoryItem${id}Title`}
                text={title}
              />
              <Row gutter="sm">
                <Phrase
                  color="secondary"
                  numberOfLines={1}
                  testID={`NotificationHistoryItem${id}CreationDate`}
                  variant="body">
                  {createdAt}
                </Phrase>
                {!is_read && (
                  <Badge
                    testID={`NotificationHistoryItem${id}IsUnreadBadge`}
                    variant="extraSmall"
                  />
                )}
              </Row>
            </Row>
            <Paragraph testID={`NotificationHistoryItem${id}Description`}>
              {body}
            </Paragraph>
          </Column>
        </Row>
      </Box>
    </PressableBase>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    iconContainer: {
      backgroundColor: color.notificationHistory.itemIcon.background,
      justifyContent: 'center',
      alignItems: 'center',
      width: size.iconContainer.xl,
      height: size.iconContainer.xl,
    },
  })
