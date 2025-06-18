import {useLinkTo} from '@react-navigation/native'
import {StyleSheet, View} from 'react-native'
import {createPathFromNotification} from '@/app/navigation/linking'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Badge} from '@/components/ui/feedback/Badge'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
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
  item: {body, context, created_at, id, image, is_read, module_slug, title},
  enabledModules = [],
}: Props) => {
  const {navigate} = useNavigation()
  const module = enabledModules.find(({slug}) => slug === module_slug)
  const styles = useThemable(createStyles)

  const linkTo = useLinkTo()

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
        const deeplinkUrl = createPathFromNotification(
          {
            title,
            body,
            data: context,
          },
          false,
        )

        if (deeplinkUrl) {
          linkTo(deeplinkUrl)
        } else if (module_slug) {
          navigate(module_slug)
        }
      }}
      testID={`NotificationHistoryItem${id}Button`}>
      <Box
        insetHorizontal="md"
        insetVertical="smd">
        <Row gutter="sm">
          <View style={styles.iconContainer}>
            {image && image.sources[0] ? (
              <Image
                aspectRatio="square"
                source={image.sources[0]}
                testID={`NotificationHistoryItem${id}Image`}
              />
            ) : (
              <Icon
                color="inverse"
                name={icon}
                size="xl"
                testID={`NotificationHistoryItem${id}Icon`}
              />
            )}
          </View>
          <Column
            grow={1}
            shrink={1}>
            <Row
              align="between"
              flex={1}
              gutter="sm"
              valign="start">
              <Title
                level="h5"
                testID={`NotificationHistoryItem${id}Title`}
                text={title}
              />
              <Row gutter="sm">
                <Phrase
                  color="secondary"
                  numberOfLines={1}
                  testID={`NotificationHistoryItem${id}CreationDatePhrase`}
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
            <Paragraph testID={`NotificationHistoryItem${id}DescriptionText`}>
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
