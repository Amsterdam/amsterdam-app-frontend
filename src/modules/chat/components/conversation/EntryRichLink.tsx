import {
  ConversationEntryRichLink,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {MessageBubble} from '@/modules/chat/components/MessageBubble'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'
import {getDomainName} from '@/utils/getDomainName'

type Props = {
  message: ConversationEntryRichLink
}

export const EntryRichLink = ({message}: Props) => {
  const openUrl = useOpenUrl()
  const {title, url} = message

  return (
    <MessageBubble message={message}>
      <InlineLink
        emphasis="strong"
        inverse={message.sender.role === ConversationEntrySenderRole.user}
        onPress={() => url && openUrl(url)}
        testID="ChatMessageRichLinkUrl">
        {title}
      </InlineLink>
      <MessagePhrase
        message={message}
        testID="RichLinkTitle">
        {getDomainName(url)}
      </MessagePhrase>
    </MessageBubble>
  )
}