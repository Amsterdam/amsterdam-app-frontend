import {ReactNode} from 'react'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Row} from '@/components/ui/layout/Row'
import {AvatarAgent} from '@/modules/chat/assets/AvatarAgent'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {ChatMessageBubble} from '@/modules/chat/components/ChatMessageBubble'

type Props = {
  children: ReactNode
  isText?: boolean
  message: ConversationEntry
}

/**
 * When the message is sent by the agent, or when there is a text message by system, to introduce an agent
 */
const isAgent = (message: ConversationEntry) =>
  message.sender.role === ConversationEntrySenderRole.agent ||
  (message.sender.role === ConversationEntrySenderRole.system &&
    message.format === ConversationEntryFormat.text)

export const ChatMessageEntry = ({message, children, isText = true}: Props) => {
  const isUser = message.sender.role === ConversationEntrySenderRole.user

  return (
    <Row
      align={isUser ? 'end' : 'start'}
      gutter="sm"
      valign="end">
      {message.sender.role === ConversationEntrySenderRole.chatbot && (
        <AvatarBot />
      )}
      {isAgent(message) && <AvatarAgent />}
      {isText ? (
        <ChatMessageBubble senderRole={message.sender.role}>
          {children}
        </ChatMessageBubble>
      ) : (
        children
      )}
    </Row>
  )
}
