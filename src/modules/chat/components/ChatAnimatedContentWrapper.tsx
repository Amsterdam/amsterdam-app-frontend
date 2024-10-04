import {ReactNode, useContext} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useTheme} from '@/themes/useTheme'

type Props = {
  children: ReactNode
}

export const ChatAnimatedContentWrapper = ({children}: Props) => {
  const {isMaximized} = useContext(ChatContext)
  const {duration} = useTheme()
  const styles = createStyles()

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isMaximized ? 1 : 0, {
      duration: duration.transition.short,
    }),
  }))

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {children}
    </Animated.View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  })
