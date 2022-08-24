import AlertIcon from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {useNavigation} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {
  InteractionManager,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Box, SingleSelectable} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {resetAlert, selectAlert, setAlertVisibility} from '@/store/alertSlice'
import {Theme, useThemable, useTheme} from '@/themes'
import {CloseType, Variant} from '@/types'
import {accessibleText} from '@/utils'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const {closeType, content, isVisible, variant, withIcon} =
    useSelector(selectAlert)

  const {color} = useTheme()
  const styles = useThemable(createStyles(variant))

  useEffect(() => {
    return navigation.addListener('blur', () => {
      const task = InteractionManager.runAfterInteractions(() => {
        dispatch(resetAlert())
      })
      return () => task.cancel()
    })
  }, [dispatch, navigation])

  if (!isVisible) {
    return null
  }

  const IconComponent = variant === Variant.success ? Checkmark : AlertIcon

  const alertComponent = (
    <Box>
      <View style={styles.view}>
        <Row align="between">
          <SingleSelectable
            accessibilityLabel={accessibleText(content?.title, content?.text)}>
            <Row gutter="md">
              {!!withIcon && (
                <Icon size={24}>
                  <IconComponent fill={color.text.default} />
                </Icon>
              )}
              <View>
                {!!content?.title && <Title level="h4" text={content?.title} />}
                <Paragraph>{content?.text}</Paragraph>
              </View>
            </Row>
          </SingleSelectable>
          {closeType === CloseType.withButton && (
            <IconButton
              accessibilityHint="Sluit melding"
              icon={
                <Icon size={24}>
                  <Close fill={color.text.default} />
                </Icon>
              }
              onPress={() => dispatch(setAlertVisibility(false))}
            />
          )}
        </Row>
      </View>
    </Box>
  )

  if (closeType === CloseType.withoutButton) {
    return (
      <Pressable onPress={() => dispatch(resetAlert())}>
        {alertComponent}
      </Pressable>
    )
  }

  return alertComponent
}

const createStyles =
  (variant?: Variant) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      view: {
        backgroundColor:
          variant === Variant.information
            ? color.box.background.alert
            : color.box.background.white,
        borderWidth: variant === Variant.information ? 0 : 2,
        borderColor:
          variant === Variant.success
            ? color.severity.positive
            : color.severity.negative,
        padding: size.spacing.md,
      },
    })
