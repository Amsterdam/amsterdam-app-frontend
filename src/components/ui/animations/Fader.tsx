import {ReactNode, forwardRef, useEffect, useRef} from 'react'
import {Animated, Easing, StyleProp, View, ViewStyle} from 'react-native'

type Props = {
  children: ReactNode
  duration?: number
  style?: StyleProp<ViewStyle>
}

export const Fader = forwardRef<View, Props>(
  ({duration = 300, style, children}, ref) => {
    const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        easing: Easing.linear,
        toValue: 1, // Animate to opacity: 1 (visible)
        duration: duration,
        useNativeDriver: true, // Add this line
      }).start()
    }, [fadeAnim, duration])

    return (
      <Animated.View // Special animatable View
        ref={ref}
        style={[
          style,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}>
        {children}
      </Animated.View>
    )
  },
)
