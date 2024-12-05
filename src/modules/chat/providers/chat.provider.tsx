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
  ConversationEntryFormat,
  ConversationEntryRoutingWorkType,
  RemoteConfiguration,
  RetrieveTranscriptResponse,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useToggle} from '@/hooks/useToggle'
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
  downloadedTranscriptIds: [],
  employeeInChat: false,
  endChat: () => null,
  isEnded: false,
  isWaitingForAgent: false,
  messages: [],
  newMessagesCount: 0,
  ready: false,
  remoteConfiguration: undefined,
}

/**
 * Function to check if the chat is ended or not
 * How it works:
 * It checks whether the last received message (excluding Transcript entries) is of format RoutingWorkResult
 * If that is the case, and the workType is 'closed' and we are not waiting for an agent, then the chat is ended
 *
 * This function should preferably be replaced by a reliable isEnded value that is provided by Salesforce
 */
const isChatEnded = (
  messages: ConversationEntry[],
  isWaitingForAgent: boolean,
): boolean => {
  const filteredMessages = messages.filter(
    message => message.format !== ConversationEntryFormat.transcript,
  )
  const lastMessage = filteredMessages[filteredMessages.length - 1]

  return (
    lastMessage?.format === ConversationEntryFormat.routingWorkResult &&
    lastMessage.workType === ConversationEntryRoutingWorkType.closed &&
    !isWaitingForAgent
  )
}

const useIsChatEnded = (
  messages: ConversationEntry[],
  isWaitingForAgent: boolean,
): {endChat: () => void; isEnded: boolean} => {
  const {value: isEnded, enable: endChat} = useToggle(false)

  return {
    isEnded: isEnded || isChatEnded(messages, isWaitingForAgent),
    endChat,
  }
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
  const {isEnded, endChat} = useIsChatEnded(messages, isWaitingForAgent)

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
      endChat,
      messages:
        isTyping && !isEnded
          ? [...filterOutDeliveryAcknowledgements(messages), isTyping]
          : filterOutDeliveryAcknowledgements(messages),
      newMessagesCount,
      ready,
      employeeInChat,
      isEnded,
      remoteConfiguration,
      isWaitingForAgent,
    }),
    [
      addDownloadedTranscriptId,
      downloadedTranscriptIds,
      employeeInChat,
      endChat,
      isTyping,
      isWaitingForAgent,
      isEnded,
      messages,
      newMessagesCount,
      ready,
      remoteConfiguration,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
