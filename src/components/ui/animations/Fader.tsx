import {ReactNode, forwardRef, useEffect, useRef} from 'react'
import {Animated, Easing, StyleProp, View, ViewStyle} from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  startFadeIn?: boolean
  style?: StyleProp<ViewStyle>
}

export const Fader = forwardRef<View, Props>(
  ({duration = 300, startFadeIn = true, style, children}, ref) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
      startFadeIn &&
        Animated.timing(fadeAnim, {
          easing: Easing.linear,
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }).start()
    }, [fadeAnim, duration, startFadeIn])

    return (
      <Animated.View
        ref={ref}
        style={[
          style,
          {
            opacity: fadeAnim,
          },
        ]}>
        {children}
      </Animated.View>
    )
  },
)
