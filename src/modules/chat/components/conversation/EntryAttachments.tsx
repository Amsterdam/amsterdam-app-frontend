import {
  ConversationEntryAttachments,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {MessageBubble} from '@/modules/chat/components/MessageBubble'
import {saveFile} from '@/modules/chat/utils/saveFile'

type Props = {
  message: ConversationEntryAttachments
}

export const EntryAttachments = ({message}: Props) => {
  const isEmployee =
    message.sender.role === ConversationEntrySenderRole.employee

  return (
    <>
      {message.attachments.map(attachment => (
        <MessageBubble
          key={attachment.id}
          message={message}>
          <Row
            grow={1}
            gutter="sm"
            valign="center">
            <Icon
              color={isEmployee ? 'link' : 'inverse'}
              name="document"
              size="lg"
              testID=""
            />
            {isEmployee ? (
              <InlineLink
                ellipsizeMode="middle"
                emphasis="strong"
                inverse={
                  message.sender.role === ConversationEntrySenderRole.user
                }
                numberOfLines={1}
                onPress={() => {
                  void saveFile({
                    downloadUri: attachment.url,
                    fileName: attachment.name,
                  })
                }}
                testID="EntryAttachmentsInlineLink">
                {attachment.name}
              </InlineLink>
            ) : (
              <Phrase
                color="inverse"
                testID={'ChatMessageAttachmentFileName'}
                textAlign="center">
                {attachment.name}
              </Phrase>
            )}
          </Row>
        </MessageBubble>
      ))}
    </>
  )
}
