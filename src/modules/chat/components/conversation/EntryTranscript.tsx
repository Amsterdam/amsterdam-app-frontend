import {useContext} from 'react'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatInlineMessage} from '@/modules/chat/components/ChatInlineMessage'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

type Props = {
  message: ConversationEntry
}

export const EntryTranscript = ({message}: Props) => {
  const {downloadedTranscriptTimestamps} = useContext(ChatContext)

  return downloadedTranscriptTimestamps.includes(message.timestamp) ? (
    <>
      <ChatInlineMessage
        icon="download"
        testID={'ChatDownloadedInlineMessage'}
        text="Chat gedownload"
      />
    </>
  ) : null
}
