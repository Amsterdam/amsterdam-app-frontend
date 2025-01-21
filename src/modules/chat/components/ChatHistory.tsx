import {useContext, useRef} from 'react'
import {Keyboard, ScrollView, StyleSheet} from 'react-native'
import {
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatStartTime} from '@/modules/chat/components/ChatStartTime'
import {Entry} from '@/modules/chat/components/conversation/Entry'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

/**
 * Chats are grouped when they :
 * - are in the same minute (rounded down)
 * - have the same sender
 * - have the same status ( but only if the sender is the user, otherwise all statuses may be grouped together)
 */
const checkIsMessageLastOfGroup = (
  message: ConversationEntry,
  index: number,
  messages: ConversationEntry[],
): boolean =>
  messages[index + 1]?.sender.role !== message.sender.role ||
  (message.sender.role === ConversationEntrySenderRole.user &&
    messages[index + 1]?.status !== message.status) ||
  dayjsFromUnix(messages[index + 1]?.timestamp).format('HH:mm') !==
    dayjsFromUnix(message.timestamp).format('HH:mm')

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
            const isLastOfGroup = checkIsMessageLastOfGroup(
              message,
              index,
              messages,
            )

            return (
              <Entry
                isLast={index === messages.length - 1}
                isLastOfGroup={isLastOfGroup}
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
