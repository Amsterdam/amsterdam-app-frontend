import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConnectionState,
  RemoteConfiguration,
  RetrieveTranscriptResponse,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useIsChatEnded} from '@/modules/chat/hooks/useIsChatEnded'
import {useMarkAsRead} from '@/modules/chat/hooks/useMarkAsRead'
import {useSendNotificationWhenInBackground} from '@/modules/chat/hooks/useSendNotificationWhenInBackground'
import {useSubmitRemoteConfiguration} from '@/modules/chat/hooks/useSubmitRemoteConfiguration'
import {useChat} from '@/modules/chat/slice'
import {filterOutCloseChatMessage} from '@/modules/chat/utils/filterOutCloseChatMessage'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'

type ChatContextType = {
  addDownloadedTranscriptId: (
    entryId: RetrieveTranscriptResponse['entryId'],
  ) => void
  agentInChat: boolean
  connectionStatus: ConnectionState | null
  downloadedTranscriptIds: RetrieveTranscriptResponse['entryId'][]
  endChat: () => void
  isEnded: boolean
  isWaitingForAgent: boolean
  messages: ConversationEntry[]
  newMessagesCount: number
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
}

const initialValue: ChatContextType = {
  addDownloadedTranscriptId: () => null,
  agentInChat: false,
  downloadedTranscriptIds: [],
  connectionStatus: null,
  endChat: () => null,
  isEnded: false,
  isWaitingForAgent: false,
  messages: [],
  newMessagesCount: 0,
  ready: false,
  remoteConfiguration: undefined,
}

export const ChatContext = createContext<ChatContextType>(initialValue)

type Props = {
  children: ReactNode
}

export const ChatProvider = ({children}: Props) => {
  const {isMaximized, isMinimized} = useChat()
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [newMessagesCount, setNewMessagesCount] = useState(0)
  const [downloadedTranscriptIds, setDownloadedTranscriptIds] = useState<
    RetrieveTranscriptResponse['entryId'][]
  >([])
  const coreConfig = useCoreConfig()
  const {
    messages,
    isTyping,
    conversationId: newConversationId,
    ready,
    agentInChat,
    remoteConfiguration,
    connectionStatus,
    isWaitingForAgent,
  } = useCreateChat({
    ...coreConfig,
    conversationId,
  })
  const {isEnded, endChat} = useIsChatEnded(
    messages,
    isWaitingForAgent,
    agentInChat,
  )

  const addDownloadedTranscriptId = useCallback((transcriptId: string) => {
    setDownloadedTranscriptIds(ids => [...ids, transcriptId])
  }, [])

  useEffect(() => {
    if (isMinimized && isNewMessage(messages[messages.length - 1]?.format)) {
      setNewMessagesCount(count => count + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])

  useEffect(() => {
    if (isMaximized) {
      setNewMessagesCount(0)
    }
  }, [isMaximized])
  useEffect(() => {
    setConversationId(newConversationId ?? conversationId)
  }, [conversationId, newConversationId, setConversationId])

  useSendNotificationWhenInBackground(messages)

  useMarkAsRead(messages)

  useSubmitRemoteConfiguration(remoteConfiguration)

  const value = useMemo(() => {
    const filteredMessages = filterOutCloseChatMessage(
      filterOutDeliveryAcknowledgements(messages),
    )
    const preparedMessages =
      isTyping && !isEnded ? [...filteredMessages, isTyping] : filteredMessages

    return {
      addDownloadedTranscriptId,
      agentInChat,
      connectionStatus,
      downloadedTranscriptIds,
      endChat,
      isEnded,
      isWaitingForAgent,
      messages: preparedMessages,
      newMessagesCount,
      ready:
        ready &&
        (!!isTyping ||
          messages.some(
            message => message.format === ConversationEntryFormat.text,
          )),
      remoteConfiguration,
    }
  }, [
    addDownloadedTranscriptId,
    agentInChat,
    connectionStatus,
    downloadedTranscriptIds,
    endChat,
    isEnded,
    isWaitingForAgent,
    isTyping,
    messages,
    newMessagesCount,
    ready,
    remoteConfiguration,
  ])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
