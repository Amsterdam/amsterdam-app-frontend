import {createContext, ReactNode, useEffect, useMemo, useState} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'

type ChatContextType = {
  messages: ConversationEntry[]
}

const initialValue: ChatContextType = {
  messages: [],
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
    }),
    [messages, isTyping],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
