import {createContext, ReactNode, useMemo} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useChat} from '@/modules/chat/slice'
import {ChatVisibility} from '@/modules/chat/types'

type ChatContextType = {
  isMaximized: boolean
  messages: ConversationEntry[]
}

const initialValue: ChatContextType = {
  isMaximized: false,
  messages: [],
}

export const ChatContext = createContext<ChatContextType>(initialValue)

type Props = {
  children: ReactNode
}

export const ChatProvider = ({children}: Props) => {
  const coreConfig = useCoreConfig()
  const {messages} = useCreateChat(coreConfig)
  const {visibility} = useChat()
  const isMaximized = visibility === ChatVisibility.maximized

  const value = useMemo(
    () => ({isMaximized, messages}),
    [isMaximized, messages],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
