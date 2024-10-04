import {Fragment, useContext, useRef} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {ConversationEntrySenderRole} from 'react-native-salesforce-messaging-in-app/src/types'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {ChatMessage} from '@/modules/chat/components/ChatMessage'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

export const ChatHistory = () => {
  const scrollRef = useRef<ScrollView>(null)
  const styles = createStyles()
  const {messages} = useContext(ChatContext)

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
          <ChatStartTime firstMessage={messages[0]} />
          <Gutter height="md" />
          {messages.map((message, index) => {
            if (message.senderRole !== ConversationEntrySenderRole.system) {
              const isLastOfType =
                messages[index + 1]?.senderRole !== message.senderRole

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
