import {
  ConversationEntryRichLink,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {getDomainName} from '@/utils/getDomainName'

type Props = {
  message: ConversationEntryRichLink
}

export const EntryRichLink = ({message}: Props) => {
  const openUrl = useOpenUrl()
  const {title, url} = message
  const domain = getDomainName(url)

  return (
    <ChatMessageEntry message={message}>
      <InlineLink
        emphasis="strong"
        inverse={message.sender.role === ConversationEntrySenderRole.user}
        onPress={() => url && openUrl(url)}
        testID="ChatMessageRichLinkTitle">
        {title}
      </InlineLink>
      {!!domain && (
        <InlineLink
          inverse={message.sender.role === ConversationEntrySenderRole.user}
          onPress={() => url && openUrl(url)}
          testID="ChatMessageRichLinkUrl">
          {domain}
        </InlineLink>
      )}
    </ChatMessageEntry>
  )
}
