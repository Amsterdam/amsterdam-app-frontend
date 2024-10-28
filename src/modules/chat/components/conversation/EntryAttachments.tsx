import {ConversationEntryAttachments} from 'react-native-salesforce-messaging-in-app/src/types'
import {Column} from '@/components/ui/layout/Column'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'

type Props = {
  message: ConversationEntryAttachments
}

const convertMimeTypeToText = (mimeType: string) => {
  switch (mimeType) {
    case 'application/pdf':
      return 'PDF'
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return 'foto'
    default:
      return mimeType
  }
}

const convertMimeTypeToIcon = (mimeType: string): SvgIconName => {
  switch (mimeType) {
    case 'application/pdf':
      return 'document'
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return 'picture'
    default:
      return 'document-text'
  }
}

export const EntryAttachments = ({message}: Props) => (
  <Column gutter="md">
    {message.attachments.map(attachment => (
      <ChatInlineMessage
        icon={convertMimeTypeToIcon(attachment.mimeType)}
        testID={`ChatMessageAttachment${attachment.mimeType}`}
        text={`U heeft een ${convertMimeTypeToText(attachment.mimeType)} gedeeld.${attachment.file ? '\n' + attachment.file : ''}`}
      />
    ))}
  </Column>
)
