import {View, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
import {ChatMessageLoading} from '@/modules/chat/components/ChatMessageLoading'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  message: ConversationEntry
}

export const ChatMessage = ({message}: Props) => {
  const styles = useThemable(theme => createStyles(theme, message.senderRole))
  const isUser = message.senderRole === ConversationEntrySenderRole.user
  const isLoading = false

  return (
    <Row
      align={isUser ? 'end' : 'start'}
      gutter="sm"
      valign="end">
      {!isLoading &&
        message.senderRole === ConversationEntrySenderRole.chatbot && (
          <AvatarBot />
        )}
      {!isLoading &&
        message.senderRole === ConversationEntrySenderRole.employee && (
          <AvatarEmployee />
        )}
      <View style={styles.textContainer}>
        {isLoading ? (
          <ChatMessageLoading />
        ) : (
          <Phrase
            color={
              message.senderRole === ConversationEntrySenderRole.user
                ? 'inverse'
                : undefined
            }
            testID="">
            {message.text}
          </Phrase>
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
      backgroundColor: color.chat.message.background[agent],
      paddingHorizontal: size.spacing.md,
      paddingVertical: size.spacing.sm,
      borderRadius: borderRadius,
      borderBottomRightRadius: isUser ? 0 : borderRadius,
      borderBottomLeftRadius: isUser ? borderRadius : 0,
    },
  })
}
