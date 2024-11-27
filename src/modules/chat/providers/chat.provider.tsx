import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  submitRemoteConfiguration,
  useCreateChat,
} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  RemoteConfiguration,
  RetrieveTranscriptResponse,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useChat} from '@/modules/chat/slice'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'

type ChatContextType = {
  addDownloadedTranscriptId: (
    entryId: RetrieveTranscriptResponse['entryId'],
  ) => void
  downloadedTranscriptIds: RetrieveTranscriptResponse['entryId'][]
  employeeInChat: boolean
  isWaitingForAgent: boolean
  messages: ConversationEntry[]
  newMessagesCount: number
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
}

const initialValue: ChatContextType = {
  addDownloadedTranscriptId: () => null,
  downloadedTranscriptIds: [],
  messages: [],
  newMessagesCount: 0,
  ready: false,
  employeeInChat: false,
  remoteConfiguration: undefined,
  isWaitingForAgent: false,
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
    employeeInChat,
    remoteConfiguration,
    isWaitingForAgent,
  } = useCreateChat({
    ...coreConfig,
    conversationId,
  })

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

  useEffect(() => {
    if (remoteConfiguration) {
      const remoteConfig = JSON.parse(
        JSON.stringify(remoteConfiguration),
      ) as RemoteConfiguration

      remoteConfig.preChatConfiguration[0]?.hiddenPreChatFields.forEach(
        field => {
          if (field.name === 'Origin') {
            field.value = 'App'
          } else if (field.name === 'Start_Location') {
            field.value = 'contact'
          }
        },
      )
      void submitRemoteConfiguration(remoteConfig, true)
    }
  }, [remoteConfiguration])

  const value = useMemo(
    () => ({
      addDownloadedTranscriptId,
      downloadedTranscriptIds,
      messages: isTyping
        ? [...filterOutDeliveryAcknowledgements(messages), isTyping]
        : filterOutDeliveryAcknowledgements(messages),
      newMessagesCount,
      ready,
      employeeInChat,
      remoteConfiguration,
      isWaitingForAgent,
    }),
    [
      addDownloadedTranscriptId,
      downloadedTranscriptIds,
      employeeInChat,
      isTyping,
      isWaitingForAgent,
      messages,
      newMessagesCount,
      ready,
      remoteConfiguration,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
