import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ChatAnimatedContentWrapper} from '@/modules/chat/components/ChatAnimatedContentWrapper'
import {ChatAnimatedWrapper} from '@/modules/chat/components/ChatAnimatedWrapper'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatHistory} from '@/modules/chat/components/ChatHistory'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {ChatWaitToStart} from '@/modules/chat/components/ChatWaitToStart'
import {ChatProvider} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'

export const Chat = () => {
  const {isOpen} = useChat()

  return isOpen ? (
    <ChatProvider>
      <ChatAnimatedWrapper>
        <ChatHeader />
        <ChatWaitToStart>
          <ChatAnimatedContentWrapper>
            <ChatHistory />
          </ChatAnimatedContentWrapper>
          <ChatInput onSubmit={sendMessage} />
        </ChatWaitToStart>
      </ChatAnimatedWrapper>
    </ChatProvider>
  ) : null
}
