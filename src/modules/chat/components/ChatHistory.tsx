import {Fragment, useRef} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {ChatMessage} from '@/modules/chat/components/ChatMessage'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'
import {type ChatMessage as ChatMessageType} from '@/modules/chat/types'

type Props = {
  history: ChatMessageType[]
}

export const ChatHistory = ({history}: Props) => {
  const scrollRef = useRef<ScrollView>(null)
  const styles = createStyles()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
      ref={scrollRef}
      style={styles.scrollView}>
      <Column>
        <ChatStartTime firstMessage={history[0]} />
        <Gutter height="md" />
        {history.map((message, index) => {
          const isLastOfType = history[index + 1]?.agent !== message.agent

          return (
            <Fragment key={message.timestamp}>
              <ChatMessage message={message} />
              <ChatAgentInfo
                isLastOfType={isLastOfType}
                message={message}
              />
              <Gutter height={isLastOfType ? 'md' : 'sm'} />
            </Fragment>
          )
        })}
      </Column>
    </ScrollView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
    },
    scrollView: {
      flex: 1,
    },
  })
