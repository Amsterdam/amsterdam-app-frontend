import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useContext} from 'react'
import {Platform, StyleSheet, UIManager, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {AlertContext} from '../../providers'
import {color, size} from '../../tokens'
import {accessibleText} from '../../utils'
import {Row} from './layout'
import {SingleSelectable, Text, Title} from '.'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const {changeVisibility, content, isVisible, variant} =
    useContext(AlertContext)

  const dynamicStyles = StyleSheet.create({
    alert: {
      backgroundColor:
        variant === 'success' ? color.background.valid : color.status.error,
    },
  })

  if (!isVisible) {
    return null
  }

  return (
    <View style={[styles.alert, dynamicStyles.alert]}>
      <Row align="between">
        <SingleSelectable
          accessibilityLabel={accessibleText(content?.title, content?.text)}>
          <Title inverse level={4} text={content?.title!} />
          <Text inverse>{content?.text}</Text>
        </SingleSelectable>
        <TouchableOpacity
          accessibilityHint="Sluit melding"
          accessibilityRole="button"
          onPress={() => changeVisibility(false)}>
          <Close fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    padding: size.spacing.md,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
  },
})
