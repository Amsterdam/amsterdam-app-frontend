import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useContext, useLayoutEffect, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Easing} from 'react-native-reanimated'
import {AlertContext} from '../../providers'
import {color, size} from '../../tokens'
import {Row} from './layout'
import {Text, Title} from '.'

export const Alert = () => {
  const {changeVisibility, content, isVisible, maxHeight, variant} =
    useContext(AlertContext)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const hideAlert = () => {
    changeVisibility(false)
  }

  useLayoutEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        easing: Easing.bezier(0, 1, 0, 1),
        toValue: maxHeight,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start()
    }
  }, [isVisible, fadeAnim, maxHeight])

  const styles = StyleSheet.create({
    alert: {
      backgroundColor:
        variant === 'success' ? color.status.success : color.status.error,
    },
    inner: {
      padding: size.spacing.md,
    },
    icon: {
      width: 24,
      aspectRatio: 1,
    },
  })

  return (
    <Animated.View style={[styles.alert, {maxHeight: fadeAnim}]}>
      <View style={styles.inner}>
        <Row align="between">
          <Title inverse text={content?.title!} />
          <TouchableOpacity onPress={hideAlert}>
            <Close fill="white" style={styles.icon} />
          </TouchableOpacity>
        </Row>
        <Text inverse>{content?.text}</Text>
      </View>
    </Animated.View>
  )
}
