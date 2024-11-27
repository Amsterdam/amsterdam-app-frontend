import {useContext, useRef} from 'react'
import {Keyboard, ScrollView, StyleSheet} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'
import {Entry} from '@/modules/chat/components/conversation/Entry'
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
      style={styles.scrollView}
      testID="ChatHistoryScrollView">
      <Box
        grow
        insetHorizontal="md">
        <Column>
          <ChatStartTime firstMessage={messages[0]} />
          <Gutter height="md" />
          {messages.map((message, index) => {
            const isLastOfRole =
              messages[index + 1]?.sender.role !== message.sender.role

            return (
              <Entry
                isLast={index === messages.length - 1}
                isLastOfRole={isLastOfRole}
                key={message.entryId + index}
                message={message}
              />
            )
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
