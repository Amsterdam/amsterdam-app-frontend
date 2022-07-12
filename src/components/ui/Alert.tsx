import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React from 'react'
import {Platform, StyleSheet, UIManager, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {SingleSelectable, Text, Title} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {
  selectAlertContent,
  selectAlertVariant,
  selectAlertVisibility,
  setAlertVisibility,
  Variant,
} from '@/store/alertSlice'
import {Theme, useThemable, useTheme} from '@/themes'
import {accessibleText} from '@/utils'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const dispatch = useDispatch()
  const {color} = useTheme()
  const content = useSelector(selectAlertContent)
  const isVisible = useSelector(selectAlertVisibility)
  const variant = useSelector(selectAlertVariant)
  const styles = useThemable(createStyles(variant))

  if (!isVisible) {
    return null
  }

  return (
    <View style={styles.alert}>
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
              <Close fill={color.text.inverse} />
            </Icon>
          }
          onPress={() => dispatch(setAlertVisibility(false))}
        />
      </Row>
    </View>
  )
}

const createStyles =
  (variant?: Variant) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      alert: {
        backgroundColor:
          variant === 'success'
            ? color.severity.positive
            : variant === 'failure'
            ? color.severity.negative
            : color.box.background.grey,
        padding: size.spacing.md,
      },
    })
