import {ReactNode} from 'react'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
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
      {message.sender.role === ConversationEntrySenderRole.employee && (
        <AvatarEmployee />
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
