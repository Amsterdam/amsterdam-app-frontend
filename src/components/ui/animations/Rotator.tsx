import {ReactNode, useCallback, useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import {Row} from '@/components/ui/layout/Row'

const initialRotation = 0
let stopAnimation = false

type RotatorProps = {
  children?: ReactNode
}

/**
 * Indicates activity, often while performing network tasks.
 * Best used through `PleaseWait` rather than by itself.
 */
export const Rotator = ({children}: RotatorProps) => {
  const rotation = useRef(new Animated.Value(initialRotation)).current

  const startAnimation = useCallback(() => {
    rotation.setValue(initialRotation)

    Animated.timing(rotation, {
      toValue: 360,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => !stopAnimation && startAnimation())
  }, [rotation])

  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    startAnimation()
    stopAnimation = false

    return () => {
      stopAnimation = true
    }
  }, [startAnimation])

  return (
    <Row align="center">
      <Animated.View
        accessibilityLabel="Bezig …"
        accessible
        style={[{transform: [{rotate}]}]}>
        {children}
      </Animated.View>
    </Row>
  )
}
