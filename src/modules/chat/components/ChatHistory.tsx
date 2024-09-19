import {Fragment} from 'react'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentName} from '@/modules/chat/components/ChatAgentName'
import {ChatMessage} from '@/modules/chat/components/ChatMessage'
import {type ChatMessage as ChatMessageType} from '@/modules/chat/types'

type Props = {
  history: ChatMessageType[]
}

export const ChatHistory = ({history}: Props) => (
  <Column grow={1}>
    {history.map((message, index) => {
      const isLastOfType = history[index + 1]?.agent !== message.agent

      return (
        <Fragment key={message.timestamp}>
          <ChatMessage message={message} />
          <ChatAgentName
            agent={message.agent}
            isLastOfType={isLastOfType}
          />
          <Gutter height={isLastOfType ? 'md' : 'sm'} />
        </Fragment>
      )
    })}
  </Column>
)
