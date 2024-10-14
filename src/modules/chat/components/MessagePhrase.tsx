import {ReactNode} from 'react'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Phrase} from '@/components/ui/text/Phrase'

type MessagePhraseProps = {
  children: ReactNode
  message: ConversationEntry
  testID: string
}

export const MessagePhrase = ({
  children,
  message,
  testID,
}: MessagePhraseProps) => (
  <Phrase
    color={
      message.sender.role === ConversationEntrySenderRole.user
        ? 'inverse'
        : undefined
    }
    testID={`ChatMessage${message.format + testID}`}>
    {children}
  </Phrase>
)
