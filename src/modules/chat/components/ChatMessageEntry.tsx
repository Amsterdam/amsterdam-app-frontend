import {ReactNode} from 'react'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {AvatarAgent} from '@/modules/chat/assets/AvatarAgent'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {ChatMessageBubble} from '@/modules/chat/components/ChatMessageBubble'

type Props = {
  children: ReactNode
  isText?: boolean
  message: ConversationEntry
}

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
      {message.sender.role === ConversationEntrySenderRole.agent && (
        <AvatarAgent />
      )}
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
