import {
  ConversationEntryAttachments,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {ChatMessageImage} from '@/modules/chat/components/ChatMessageImage'
import {saveFile} from '@/modules/chat/utils/saveFile'

type Props = {
  message: ConversationEntryAttachments
}

export const EntryAttachments = ({message}: Props) => {
  const isImage = message.attachments[0].mimeType.startsWith('image')
  const isEmployee =
    message.sender.role === ConversationEntrySenderRole.employee

  return (
    <>
      {message.attachments.map(attachment =>
        isImage ? (
          <ChatMessageEntry
            isText={false}
            key={attachment.id}
            message={message}>
            <ChatMessageImage
              image={attachment}
              message={message}
            />
          </ChatMessageEntry>
        ) : (
          <ChatMessageEntry
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
                  accessibilityLabel={`Bijlage gedeeld door ${message.senderDisplayName}. Dubbeltik om bijlage te downloaden.`}
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
          </ChatMessageEntry>
        ),
      )}
    </>
  )
}
