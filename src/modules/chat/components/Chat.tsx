import {StyleSheet, View, ViewProps} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {useChat} from '@/modules/chat/slice'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = ViewProps

export const Chat = ({...viewProps}: Props) => {
  const {isOpen} = useChat()
  const insets = useSafeAreaInsets()
  const styles = useThemable(theme => createStyles(theme, insets))

  return isOpen ? (
    <Animated.View
      {...viewProps}
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[viewProps.style, StyleSheet.absoluteFill, styles.container]}
      testID="ChatFullscreenWindow">
      <ChatHeader />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={insets.top}
        style={styles.scrollView}>
        <Box grow>
          <Column
            grow={1}
            gutter="md">
            <View
              style={styles.messageContainer}
              testID="ChatHistory"
            />
            <ChatInput />
          </Column>
        </Box>
      </KeyboardAwareScrollView>
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
    contentContainer: {
      flexGrow: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    messageContainer: {
      flexGrow: 1,
    },
  })
