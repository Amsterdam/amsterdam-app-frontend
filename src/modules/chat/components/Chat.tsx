import {StyleSheet, View} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ChatProvider} from '@/modules/chat/chat.provider'
import {ChatAnimateHeight} from '@/modules/chat/components/ChatAnimateHeight'
import {ChatAnimateInnerContent} from '@/modules/chat/components/ChatAnimateInnerContent'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatHistory} from '@/modules/chat/components/ChatHistory'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {useChat} from '@/modules/chat/slice'

export const Chat = () => {
  const {isOpen} = useChat()
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets)

  return isOpen ? (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}>
      <ChatProvider>
        <ChatAnimateHeight>
          <View style={styles.container}>
            <ChatAnimateInnerContent>
              <ChatHeader />
              <ChatHistory />
              <ChatInput onSubmit={sendMessage} />
            </ChatAnimateInnerContent>
          </View>
        </ChatAnimateHeight>
      </ChatProvider>
    </Animated.View>
  ) : null
}

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: insets.bottom,
    },
  })
