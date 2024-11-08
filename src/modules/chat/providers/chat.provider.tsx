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
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useChat} from '@/modules/chat/slice'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'

type ChatContextType = {
  addDownloadedTranscriptTimestamp: (timestamp: number) => void
  downloadedTranscriptTimestamps: number[]
  employeeInChat: boolean
  isWaitingForAgent: boolean
  messages: ConversationEntry[]
  newMessagesCount: number
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
}

const initialValue: ChatContextType = {
  addDownloadedTranscriptTimestamp: () => null,
  downloadedTranscriptTimestamps: [],
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
  const [newMessagesCount, setNewMessagesCount] = useState(0)
  const [downloadedTranscriptTimestamps, setDownloadedTranscriptIds] = useState<
    number[]
  >([])
  const coreConfig = useCoreConfig()
  const [conversationId, setConversationId] = useState<string>()
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

  const addDownloadedTranscriptTimestamp = useCallback(
    (transcriptId: number) => {
      setDownloadedTranscriptIds(ids => [...ids, transcriptId])
    },
    [],
  )

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
  }, [conversationId, newConversationId])

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
            field.value = 'Contact'
          }
        },
      )
      void submitRemoteConfiguration(remoteConfig, true)
    }
  }, [remoteConfiguration])

  const value = useMemo(
    () => ({
      addDownloadedTranscriptTimestamp,
      downloadedTranscriptTimestamps,
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
      addDownloadedTranscriptTimestamp,
      downloadedTranscriptTimestamps,
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
