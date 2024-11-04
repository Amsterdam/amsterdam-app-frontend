import {createContext, ReactNode, useEffect, useMemo, useState} from 'react'
import {
  submitRemoteConfiguration,
  useCreateChat,
} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  ConversationEntryType,
  RemoteConfiguration,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useChat} from '@/modules/chat/slice'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'

type ChatContextType = {
  employeeInChat: boolean
  isWaitingForAgent: boolean
  messages: ConversationEntry[]
  newMessagesCount: number
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
}

const initialValue: ChatContextType = {
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

  useEffect(() => {
    if (
      isMinimized &&
      messages[messages.length - 1]?.entryType === ConversationEntryType.message
    ) {
      setNewMessagesCount(count => count + 1)
    }
  }, [isMinimized, messages])

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
      employeeInChat,
      isTyping,
      isWaitingForAgent,
      messages,
      newMessagesCount,
      isWaitingForAgent,
      ready,
      remoteConfiguration,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
