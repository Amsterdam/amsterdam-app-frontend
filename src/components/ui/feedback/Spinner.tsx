import React, {useEffect, useRef} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {SpinnerIcon} from '@/assets/icons'
import {Row} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'

const initialRotation = 0
let stopAnimation = false

/**
 * Indicates activity, often while performing network tasks.
 * Best used through `PleaseWait` rather than by itself.
 */
export const Spinner = () => {
  const styles = useThemable(createStyles)
  const rotation = useRef(new Animated.Value(initialRotation)).current

  const startAnimation = () => {
    rotation.setValue(initialRotation)

    Animated.timing(rotation, {
      toValue: 360,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => !stopAnimation && startAnimation())
  }

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row align="center">
      <Animated.View
        accessible
        accessibilityLabel="Bezig …"
        style={[styles.container, {transform: [{rotate}]}]}>
        <SpinnerIcon />
      </Animated.View>
    </Row>
  )
}

const createStyles = ({media}: Theme) =>
  StyleSheet.create({
    container: {
      width: 20,
      aspectRatio: media.aspectRatio.square,
    },
  })
