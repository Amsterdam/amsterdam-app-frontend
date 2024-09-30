import {
  PixelRatio,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ChatProvider} from '@/modules/chat/chat.provider'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatHistory} from '@/modules/chat/components/ChatHistory'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {useChat} from '@/modules/chat/slice'
import {ChatVisibility} from '@/modules/chat/types'
import {useTheme} from '@/themes/useTheme'

type Props = ViewProps

export const Chat = (props: Props) => {
  const {isOpen, visibility} = useChat()
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const {height} = useWindowDimensions()
  const styles = createStyles()
  const isMaximized = visibility === ChatVisibility.maximized
  const fontScale = PixelRatio.getFontScale()
  const backgroundColor = isMaximized
    ? theme.color.screen.background.default
    : theme.color.screen.background.settings

  const animatedStyles = useAnimatedStyle(() => ({
    height: withTiming(isMaximized ? height : 100 * fontScale, {
      duration: 300,
    }),
    backgroundColor: withTiming(backgroundColor, {duration: 300}),
  }))

  // const animatedStylesInner = useAnimatedStyle(() => ({
  //   flexGrow: 1,
  //   transform: [
  //     {
  //       translateY: withTiming(isMaximized ? 0 : -insets.top, {duration: 300}),
  //     },
  //   ],
  // }))
  const animatedStylesHeader = {
    menuIcon: useAnimatedStyle(() => ({
      opacity: withTiming(isMaximized ? 1 : 0, {
        duration: 300,
      }),
    })),
    expandIcon: useAnimatedStyle(() => ({
      transform: [
        {
          rotate: withTiming(isMaximized ? '0deg' : '-180deg', {duration: 300}),
        },
      ],
    })),
  }

  // const animatedStylesContent = useAnimatedStyle(() => ({
  //   flex: 1,
  //   opacity: withTiming(isMaximized ? 1 : 0, {duration: 100}),
  // }))

  if (!isOpen) {
    return null
  }

  return (
    <Animated.View
      {...props}
      style={[props.style, styles.container, animatedStyles]}
      testID="ChatFullscreenWindow">
      {/* <Animated.View style={animatedStylesInner}> */}
      <ChatProvider>
        <View style={{paddingTop: insets.top}}>
          <ChatHeader styles={animatedStylesHeader} />
        </View>
        {/* <Animated.View style={animatedStylesContent}> */}
        <ChatHistory />
        <ChatInput onSubmit={sendMessage} />
        {/* </Animated.View> */}
      </ChatProvider>
      {/* </Animated.View> */}
    </Animated.View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      //   paddingTop: insets.top,
      //   paddingBottom: insets.bottom,
    },
  })
