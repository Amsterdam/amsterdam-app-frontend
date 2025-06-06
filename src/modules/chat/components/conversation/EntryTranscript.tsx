import {useContext} from 'react'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

type Props = {
  message: ConversationEntry
}

export const EntryTranscript = ({message}: Props) => {
  const {downloadedTranscriptIds} = useContext(ChatContext)

  return downloadedTranscriptIds.includes(message.entryId) ? (
    <ChatSystemEntry
      icon="download"
      testID="ChatEntryTranscriptEntry"
      text={'Chat gedownload'}
      timestamp={message.timestamp}
    />
  ) : null
}
