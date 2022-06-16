import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useContext} from 'react'
import {Platform, StyleSheet, UIManager, View} from 'react-native'
import {Row} from './layout'
import {SingleSelectable, Text, Title} from '.'
import {IconButton} from '@/components/ui'
import {Icon} from '@/components/ui/media'
import {AlertContext} from '@/providers'
import {color, size} from '@/tokens'
import {accessibleText} from '@/utils'

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
        <IconButton
          accessibilityHint="Sluit melding"
          icon={
            <Icon size={24}>
              <Close fill={color.font.inverse} />
            </Icon>
          }
          onPress={() => changeVisibility(false)}
        />
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    padding: size.spacing.md,
  },
})
