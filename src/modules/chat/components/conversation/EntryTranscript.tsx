import {useContext} from 'react'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  message: ConversationEntry
}

export const EntryTranscript = ({message}: Props) => {
  const {downloadedTranscriptIds} = useContext(ChatContext)

  return downloadedTranscriptIds.includes(message.entryId) ? (
    <ChatSystemEntry
      icon="download"
      testID="ChatEntryTranscript"
      text={`Chat gedownload - ${dayjsFromUnix(message.timestamp).format('HH:mm')}`}
    />
  ) : null
}
