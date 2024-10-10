import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
import {ChatMessageContent} from '@/modules/chat/components/ChatMessageContent'
import {ChatMessageTypingIndicator} from '@/modules/chat/components/ChatMessageTypingIndicator'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  message: ConversationEntry
}

export const ChatMessage = ({message}: Props) => {
  const styles = useThemable(theme => createStyles(theme, message.sender.role))
  const isUser = message.sender.role === ConversationEntrySenderRole.user
  const isLoading =
    message.format === ConversationEntryFormat.typingStartedIndicator

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
      <View style={styles.textContainer}>
        {isLoading ? (
          <ChatMessageTypingIndicator />
        ) : (
          <ChatMessageContent message={message} />
        )}
      </View>
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
      borderRadius: borderRadius,
      borderBottomRightRadius: isUser ? 0 : borderRadius,
      borderBottomLeftRadius: isUser ? borderRadius : 0,
    },
  })
}
