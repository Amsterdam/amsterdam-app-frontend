import {type ReactNode, type Ref, useEffect, useRef} from 'react'
import {
  Animated,
  Easing,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'

type Props = {
  callback?: Animated.EndCallback
  children: ReactNode
  duration?: number
  fadeOut?: boolean
  shouldAnimate?: boolean
  style?: StyleProp<ViewStyle>
  ref?: Ref<View>
}

export const AnimatedFader = ({
  ref,
  callback,
  children,
  duration = 300,
  fadeOut = false,
  shouldAnimate = true,
  style,
}: Props) => {
  const opacityRef = useRef(new Animated.Value(fadeOut ? 1 : 0))

  useEffect(() => {
    if (shouldAnimate) {
      Animated.timing(opacityRef.current, {
        duration,
        easing: Easing.linear,
        toValue: fadeOut ? 0 : 1,
        useNativeDriver: true,
      }).start(callback)
    }
  }, [callback, duration, fadeOut, shouldAnimate])

  return (
    <Animated.View
      ref={ref}
      style={[
        style,
        {
          opacity: opacityRef.current,
        },
      ]}>
      {children}
    </Animated.View>
  )
}

export const Fader = ({ref, ...props}: Props) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  if (isReduceMotionEnabled) {
    return (
      <View
        ref={ref}
        style={props.style}>
        {props.children}
      </View>
    )
  }

  return (
    <AnimatedFader
      {...props}
      ref={ref}
    />
  )
}
