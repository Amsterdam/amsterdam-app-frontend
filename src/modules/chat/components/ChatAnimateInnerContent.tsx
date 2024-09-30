import {ReactNode, useContext} from 'react'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {ChatContext} from '@/modules/chat/chat.provider'
import {CHAT_TRANSITION_DURATION} from '@/modules/chat/constants'

type Props = {
  children: ReactNode
}

export const ChatAnimateInnerContent = ({children}: Props) => {
  const insets = useSafeAreaInsets()
  const {isMaximized} = useContext(ChatContext)

  const animatedStylesInner = useAnimatedStyle(() => ({
    flexGrow: 1,
    transform: [
      {
        translateY: withTiming(isMaximized ? 0 : -insets.top, {
          duration: CHAT_TRANSITION_DURATION,
        }),
      },
    ],
  }))

  return <Animated.View style={animatedStylesInner}>{children}</Animated.View>
}
