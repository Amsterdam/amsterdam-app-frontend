import {ReactNode} from 'react'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {getDomainName} from '@/utils/getDomainName'

type MessagePhraseProps = {
  children: ReactNode
  message: ConversationEntry
  testID: string
}

const MessagePhrase = ({children, message, testID}: MessagePhraseProps) => (
  <Phrase
    color={
      message.senderRole === ConversationEntrySenderRole.user
        ? 'inverse'
        : undefined
    }
    testID={`ChatMessage${message.format + testID}`}>
    {children}
  </Phrase>
)

type Props = {
  message: ConversationEntry
}

export const ChatMessageContent = ({message}: Props) => {
  const openUrl = useOpenUrl()

  if (message.format === ConversationEntryFormat.richLink) {
    const {title, url} = message

    return (
      <>
        <InlineLink
          emphasis="strong"
          inverse={message.senderRole === ConversationEntrySenderRole.user}
          onPress={() => url && openUrl(url)}
          testID="ChatMessageRichLinkUrl">
          {title}
        </InlineLink>
        <MessagePhrase
          message={message}
          testID="RichLinkTitle">
          {getDomainName(url)}
        </MessagePhrase>
      </>
    )
  }

  return (
    <MessagePhrase
      message={message}
      testID="Text">
      {message.text}
    </MessagePhrase>
  )
}
