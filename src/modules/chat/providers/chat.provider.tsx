import {createContext, ReactNode, useEffect, useMemo, useState} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'

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
  const {messages, conversationId: newConversationId} = useCreateChat({
    ...coreConfig,
    conversationId,
  })

  useEffect(() => {
    setConversationId(newConversationId ?? conversationId)
  }, [conversationId, newConversationId])

  const value = useMemo(() => ({messages}), [messages])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
