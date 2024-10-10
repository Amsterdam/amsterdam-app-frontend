import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
import {ChatMessageContent} from '@/modules/chat/components/ChatMessageContent'
import {ChatMessageLoading} from '@/modules/chat/components/ChatMessageLoading'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  message: ConversationEntry
}

export const ChatMessage = ({message}: Props) => {
  const styles = useThemable(theme => createStyles(theme, message.sender.role))
  const isUser = message.sender.role === ConversationEntrySenderRole.user
  const isLoading = false

  return (
    <Row
      align={isUser ? 'end' : 'start'}
      gutter="sm"
      valign="end">
      {!isLoading &&
        message.sender.role === ConversationEntrySenderRole.chatbot && (
          <AvatarBot />
        )}
      {!isLoading &&
        message.sender.role === ConversationEntrySenderRole.employee && (
          <AvatarEmployee />
        )}
      <View style={styles.textContainer}>
        {isLoading ? (
          <ChatMessageLoading />
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
