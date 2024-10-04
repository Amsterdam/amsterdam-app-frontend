import {ReactNode, useContext, useLayoutEffect} from 'react'
import {useWindowDimensions, StyleSheet, PixelRatio} from 'react-native'
import Animated, {
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const CHAT_MINIMIZED_HEIGHT = 60

type Props = {
  children: ReactNode
}

export const ChatAnimatedWrapper = ({children}: Props) => {
  const theme = useTheme()
  const {height} = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const {isMaximized} = useContext(ChatContext)
  const fontScale = PixelRatio.getFontScale()
  const {setMinimizedHeight} = useChat()
  const styles = createStyles(theme, insets)
  const backgroundColor = isMaximized
    ? theme.color.screen.background.default
    : theme.color.screen.background.settings
  const minimizedHeight = CHAT_MINIMIZED_HEIGHT * fontScale + insets.bottom

  useLayoutEffect(() => {
    setMinimizedHeight(minimizedHeight)
  }, [minimizedHeight, setMinimizedHeight])

  const animatedStylesOuter = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(isMaximized ? 0 : height - minimizedHeight),
      },
    ],
    backgroundColor: withTiming(backgroundColor),
  }))

  const animatedStylesInner = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(isMaximized ? 0 : -insets.top),
      },
    ],
  }))

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[StyleSheet.absoluteFill, styles.container, animatedStylesOuter]}>
      <Animated.View style={[styles.inner, animatedStylesInner]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

const createStyles = ({z}: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: insets.bottom,
      zIndex: z.overlay - 1,
    },
    inner: {
      flexGrow: 1,
    },
  })
