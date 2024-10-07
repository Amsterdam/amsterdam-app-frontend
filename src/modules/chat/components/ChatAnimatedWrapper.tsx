import {ReactNode, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useChat} from '@/modules/chat/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useScreen} from '@/store/slices/screen'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const CHAT_MINIMIZED_HEIGHT = 60
const HEIGHT_CORRECTION = 8 // TODO: don't know why needed, refactor later

type Props = {
  children: ReactNode
}

export const ChatAnimatedWrapper = ({children}: Props) => {
  const theme = useTheme()
  const {isOpen} = useBottomSheet()
  const height = useSharedValue(0)
  const insets = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {isMaximized} = useChat()
  const {setSpaceBottom: setScreenSpaceBottom} = useScreen()
  const styles = createStyles(theme, insets)
  const backgroundColor = isMaximized
    ? theme.color.chat.background.maximized
    : theme.color.chat.background.minimized
  const minimizedHeight = CHAT_MINIMIZED_HEIGHT * fontScale + insets.bottom

  useEffect(() => {
    setScreenSpaceBottom(minimizedHeight - HEIGHT_CORRECTION)

    return () => {
      setScreenSpaceBottom(0)
    }
  }, [minimizedHeight, setScreenSpaceBottom])

  const animatedStylesOuter = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          isMaximized ? 0 : height.value - (isOpen ? 0 : minimizedHeight),
        ),
      },
    ],
    backgroundColor: withTiming(backgroundColor),
    borderTopColor: withTiming(
      isMaximized ? 'transparent' : theme.color.chat.border,
    ),
    borderTopWidth: withTiming(isMaximized ? 0 : theme.border.width.md),
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
      onLayout={e => {
        height.value = e.nativeEvent.layout.height
      }}
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
