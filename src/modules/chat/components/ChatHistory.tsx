import {Fragment, useRef} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {ChatMessage} from '@/modules/chat/components/ChatMessage'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'

type Props = {
  history: ConversationEntry[]
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
      <Box
        grow
        insetHorizontal="md">
        <Column>
          <ChatStartTime firstMessage={history[0]} />
          <Gutter height="md" />
          {history.map((message, index) => {
            if (message.senderRole !== ConversationEntrySenderRole.system) {
              const isLastOfType =
                history[index + 1]?.senderRole !== message.senderRole

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
            }
          })}
        </Column>
      </Box>
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
