import {ReactNode, useEffect, useRef} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'

type Props = {
  callback?: (result: {finished: boolean}) => void
  children?: ReactNode
  duration?: number
  fadeOut?: boolean
}

const AnimatedFader = ({
  callback,
  children,
  duration = 500,
  fadeOut = false,
}: Props) => {
  const opacityRef = useRef(new Animated.Value(fadeOut ? 1 : 0))

  useEffect(() => {
    Animated.timing(opacityRef.current, {
      toValue: fadeOut ? 0 : 1,
      duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(callback)
  }, [callback, duration, fadeOut])

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          opacity: opacityRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: fadeOut ? [1, 0] : [0, 1],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  )
}

export const Fader = (props: Props) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  if (isReduceMotionEnabled) {
    return <>{props.children}</>
  }

  return <AnimatedFader {...props} />
}

const styles = StyleSheet.create({
  animatedView: {flex: 1},
})
