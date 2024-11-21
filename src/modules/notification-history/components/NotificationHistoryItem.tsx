import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Badge} from '@/components/ui/feedback/Badge'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {Notification} from '@/modules/notification-history/types'
import {Module} from '@/modules/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'

type Props = {
  enabledModules: Module[] | undefined
  item: Notification
}

export const NotificationHistoryItem = ({
  item: {title, module_slug, created_at, is_read, id},
  enabledModules = [],
}: Props) => {
  const module = enabledModules.find(({slug}) => slug === module_slug)
  const styles = useThemable(createStyles)

  if (!module) {
    return null
  }

  const {title: moduleTitle, icon} = module

  return (
    <Box>
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
            flex={1}
            gutter="sm">
            <Row flex={1}>
              <Title
                level="h5"
                testID={`NotificationHistoryItem${id}Title`}
                text={moduleTitle}
              />
            </Row>
            <Row
              gutter="sm"
              valign="center">
              <Phrase
                color="secondary"
                testID={`NotificationHistoryItem${id}CreationDate`}
                variant="body">
                {formatHistoryDateTime(created_at)}
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
            {title}
          </Paragraph>
        </Column>
      </Row>
    </Box>
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
