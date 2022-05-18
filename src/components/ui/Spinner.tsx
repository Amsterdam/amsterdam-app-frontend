import SpinnerIcon from '@amsterdam/asc-assets/static/icons/Spinner.svg'
import React, {useEffect, useRef} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {color} from '../../tokens'
import {Row} from './layout'

const initialRotation = 0
let stopAnimation = false

/**
 * Indicates activity, often while performing network tasks.
 * Best used through `PleaseWait` rather than by itself.
 */
export const Spinner = () => {
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
        accessibilityLabel="Bezig…"
        style={[styles.container, {transform: [{rotate}]}]}>
        <SpinnerIcon fill={color.font.regular} />
      </Animated.View>
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    aspectRatio: 1,
  },
})