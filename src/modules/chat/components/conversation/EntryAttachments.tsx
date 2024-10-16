import {ConversationEntryAttachments} from 'react-native-salesforce-messaging-in-app/src/types'
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
      return 'Afbeelding'
    default:
      return mimeType
  }
}

export const EntryAttachments = ({message}: Props) => (
  <ChatInlineMessage
    icon="document-text"
    testID="asd"
    text={convertMimeTypeToText(message.attachments[0].mimeType)}
  />
)
