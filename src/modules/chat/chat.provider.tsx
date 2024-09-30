import {createContext, ReactNode} from 'react'
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
  const {messages} = useCreateChat(coreConfig)

  return (
    <ChatContext.Provider value={{messages}}>{children}</ChatContext.Provider>
  )
}
