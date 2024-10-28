import {createContext, ReactNode, useEffect, useMemo, useState} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'

type ChatContextType = {
  employeeInChat: boolean
  messages: ConversationEntry[]
  ready: boolean
}

const initialValue: ChatContextType = {
  messages: [],
  ready: false,
  employeeInChat: false,
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
  } = useCreateChat({
    ...coreConfig,
    conversationId,
  })

  useEffect(() => {
    setConversationId(newConversationId ?? conversationId)
  }, [conversationId, newConversationId])

  const value = useMemo(
    () => ({
      messages: isTyping
        ? [...filterOutDeliveryAcknowledgements(messages), isTyping]
        : filterOutDeliveryAcknowledgements(messages),
      ready,
      employeeInChat,
    }),
    [employeeInChat, isTyping, messages, ready],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
