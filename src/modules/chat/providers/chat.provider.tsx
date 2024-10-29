import {createContext, ReactNode, useEffect, useMemo, useState} from 'react'
import {
  submitRemoteConfiguration,
  useCreateChat,
} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  RemoteConfiguration,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'

type ChatContextType = {
  employeeInChat: boolean
  messages: ConversationEntry[]
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
}

const initialValue: ChatContextType = {
  messages: [],
  ready: false,
  employeeInChat: false,
  remoteConfiguration: undefined,
}

export const ChatContext = createContext<ChatContextType>(initialValue)

type Props = {
  children: ReactNode
}

export const ChatProvider = ({children}: Props) => {
  const coreConfig = useCoreConfig()
  const [conversationId, setConversationId] = useState<string>()
  const {
    messages,
    isTyping,
    conversationId: newConversationId,
    ready,
    employeeInChat,
    remoteConfiguration,
  } = useCreateChat({
    ...coreConfig,
    conversationId,
  })

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
      ready,
      employeeInChat,
      remoteConfiguration,
    }),
    [employeeInChat, isTyping, messages, ready, remoteConfiguration],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
