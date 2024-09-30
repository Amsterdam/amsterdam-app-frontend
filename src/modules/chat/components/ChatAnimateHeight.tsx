import {ReactNode, useContext} from 'react'
import {useWindowDimensions, PixelRatio} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {ChatContext} from '@/modules/chat/chat.provider'
import {
  MINIMIZED_HEIGHT,
  CHAT_TRANSITION_DURATION,
} from '@/modules/chat/constants'
import {useTheme} from '@/themes/useTheme'

type Props = {
  children: ReactNode
}

export const ChatAnimateHeight = ({children}: Props) => {
  const theme = useTheme()
  const {height} = useWindowDimensions()
  const fontScale = PixelRatio.getFontScale()
  const {isMaximized} = useContext(ChatContext)
  const backgroundColor = isMaximized
    ? theme.color.screen.background.default
    : theme.color.screen.background.settings
  const animatedStyles = useAnimatedStyle(() => ({
    height: withTiming(isMaximized ? height : MINIMIZED_HEIGHT * fontScale, {
      duration: CHAT_TRANSITION_DURATION,
    }),
    backgroundColor: withTiming(backgroundColor, {
      duration: CHAT_TRANSITION_DURATION,
    }),
  }))

  return (
    <Animated.View
      style={animatedStyles}
      testID="ChatFullscreenWindow">
      {children}
    </Animated.View>
  )
}
