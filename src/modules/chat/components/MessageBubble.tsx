import {ReactNode} from 'react'
import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  message: ConversationEntry
}

export const MessageBubble = ({message, children}: Props) => {
  const styles = useThemable(theme => createStyles(theme, message.sender.role))
  const isUser = message.sender.role === ConversationEntrySenderRole.user

  return (
    <Row
      align={isUser ? 'end' : 'start'}
      gutter="sm"
      valign="end">
      {message.sender.role === ConversationEntrySenderRole.chatbot && (
        <AvatarBot />
      )}
      {message.sender.role === ConversationEntrySenderRole.employee && (
        <AvatarEmployee />
      )}
      <View style={styles.textContainer}>{children}</View>
    </Row>
  )
}

const createStyles = (
  {color, size}: Theme,
  agent: ConversationEntrySenderRole,
) => {
  const isUser = agent === ConversationEntrySenderRole.user
  const borderRadius = 12

  return StyleSheet.create({
    textContainer: {
      flexShrink: 1,
      backgroundColor: color.chat.message[agent].background,
      paddingHorizontal: size.spacing.md,
      paddingVertical: size.spacing.sm,
      borderRadius,
      borderBottomRightRadius: isUser ? 0 : borderRadius,
      borderBottomLeftRadius: isUser ? borderRadius : 0,
    },
  })
}
