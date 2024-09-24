import {StyleSheet, ViewProps} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatHistory} from '@/modules/chat/components/ChatHistory'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {useChat} from '@/modules/chat/slice'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = ViewProps

export const Chat = ({...viewProps}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useThemable(theme => createStyles(theme, insets))
  const {addMessage, clearMessages, isOpen, messages} = useChat()

  return isOpen ? (
    <Animated.View
      {...viewProps}
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[viewProps.style, StyleSheet.absoluteFill, styles.container]}
      testID="ChatFullscreenWindow">
      <ChatHeader />
      <Box grow>
        <Column
          grow={1}
          gutter="md">
          <ChatHistory history={messages} />
          <ChatInput
            clearMessages={clearMessages}
            onSubmit={addMessage}
          />
        </Column>
      </Box>
    </Animated.View>
  ) : null
}

const createStyles = ({z, color}: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.screen.background.default,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      zIndex: z.overlay,
    },
    messageContainer: {
      flexGrow: 1,
    },
  })
