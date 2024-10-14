import {useContext, useRef} from 'react'
import {Keyboard, ScrollView, StyleSheet} from 'react-native'
import {ConversationEntrySenderRole} from 'react-native-salesforce-messaging-in-app/src/types'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'
import {ChatSystemMessage} from '@/modules/chat/components/ChatSystemMessage'
import {MessageContent} from '@/modules/chat/components/conversation/MessageContent'
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
      onScrollBeginDrag={Keyboard.dismiss}
      ref={scrollRef}
      style={styles.scrollView}>
      <Box
        grow
        insetHorizontal="md">
        <Column>
          <ChatStartTime firstMessage={messages[0]} />
          <Gutter height="md" />
          {messages.map((message, index) => {
            if (message.sender.role !== ConversationEntrySenderRole.system) {
              const isLastOfRole =
                messages[index + 1]?.sender.role !== message.sender.role

              return (
                <MessageContent
                  isLastOfRole={isLastOfRole}
                  key={message.entryId}
                  message={message}
                />
              )
            } else {
              return (
                <ChatSystemMessage
                  key={message.entryId}
                  message={message}
                />
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
