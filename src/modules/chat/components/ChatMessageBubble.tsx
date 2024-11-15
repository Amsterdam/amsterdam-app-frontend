import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {ConversationEntrySenderRole} from 'react-native-salesforce-messaging-in-app/src/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  senderRole: ConversationEntrySenderRole
}

export const ChatMessageBubble = ({children, senderRole}: Props) => {
  const styles = useThemable(theme => createStyles(theme, senderRole))

  return <View style={styles.bubble}>{children}</View>
}

const createStyles = (
  {color, size}: Theme,
  senderRole: ConversationEntrySenderRole,
) => {
  const isUser = senderRole === ConversationEntrySenderRole.user
  const borderRadius = 12

  return StyleSheet.create({
    bubble: {
      flexShrink: 1,
      borderRadius,
      borderBottomRightRadius: isUser ? 0 : borderRadius,
      borderBottomLeftRadius: isUser ? borderRadius : 0,
      backgroundColor: color.chat.message[senderRole].background,
      paddingHorizontal: size.spacing.md,
      paddingVertical: size.spacing.sm,
    },
  })
}
