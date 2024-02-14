import {ReactNode, forwardRef, useEffect, useRef} from 'react'
import {Animated, Easing, StyleProp, View, ViewStyle} from 'react-native'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'

type Props = {
  callback?: Animated.EndCallback
  children: ReactNode
  duration?: number
  fadeOut?: boolean
  shouldAnimate?: boolean
  style?: StyleProp<ViewStyle>
}

export const AnimatedFader = forwardRef<View, Props>(
  (
    {
      callback,
      children,
      duration = 300,
      fadeOut = false,
      shouldAnimate = true,
      style,
    },
    ref,
  ) => {
    const opacityRef = useRef(new Animated.Value(fadeOut ? 1 : 0))

    useEffect(() => {
      if (shouldAnimate) {
        Animated.timing(opacityRef.current, {
          duration: duration,
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
  },
)

export const Fader = forwardRef<View, Props>((props, ref) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  if (isReduceMotionEnabled) {
    return <>{props.children}</>
  }

  return (
    <AnimatedFader
      {...props}
      ref={ref}
    />
  )
})
