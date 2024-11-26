import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {parseTextToComponentsWithInlineLinks} from '@/utils/parseTextToComponentsWithInlineLinks'

type MessagePhraseProps = {
  children: string
  message: ConversationEntry
  testID: string
} & PhraseProps

export const MessagePhrase = ({
  children,
  message,
  testID,
  ...phraseProps
}: MessagePhraseProps) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Phrase
      {...phraseProps}
      color={
        message.sender.role === ConversationEntrySenderRole.user
          ? 'inverse'
          : undefined
      }
      testID={`ChatMessage${message.format + testID}`}>
      {parseTextToComponentsWithInlineLinks(
        children,
        openWebUrl,
        message.sender.role === ConversationEntrySenderRole.user,
      )}
    </Phrase>
  )
}
