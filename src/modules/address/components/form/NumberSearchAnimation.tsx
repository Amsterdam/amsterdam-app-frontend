import {useEffect, useRef, type PropsWithChildren} from 'react'
import {Dimensions, Animated, StyleSheet} from 'react-native'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useTheme} from '@/themes/useTheme'

export const NumberSearchAnimation = ({
  children,
  onAnimationFinished,
}: PropsWithChildren<{onAnimationFinished: () => void}>) => {
  const {size} = useTheme()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  const windowHeight = Dimensions.get('window').height
  const moveUpAnim = useRef(new Animated.Value(1)).current
  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight + size.spacing.lg],
  })

  useEffect(() => {
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      onAnimationFinished()
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isReduceMotionEnabled ? (
        children
      ) : (
        <Animated.View style={[{marginTop: y}, styles.flex]}>
          {children}
        </Animated.View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
