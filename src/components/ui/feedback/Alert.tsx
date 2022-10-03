import AlertIcon from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import {useNavigation} from '@react-navigation/core'
import React, {SVGProps, useEffect} from 'react'
import {
  InteractionManager,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Close} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Box, SingleSelectable} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {resetAlert, selectAlert, setAlertVisibility} from '@/store/alertSlice'
import {Theme, useThemable} from '@/themes'
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

  const iconProps = useThemable(createIconProps)
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
            accessibilityRole="alert"
            accessibilityLabel={accessibleText(content?.title, content?.text)}>
            <Row gutter="md">
              {!!withIcon && (
                <Icon size={24}>
                  <IconComponent {...iconProps} />
                </Icon>
              )}
              <Column>
                {!!content?.title && <Title level="h4" text={content?.title} />}
                <Paragraph>{content?.text}</Paragraph>
              </Column>
            </Row>
          </SingleSelectable>
          {closeType === CloseType.withButton && (
            <View>
              <IconButton
                accessibilityHint="Sluit melding"
                icon={
                  <Icon size={24}>
                    <Close {...iconProps} />
                  </Icon>
                }
                onPress={() => dispatch(setAlertVisibility(false))}
              />
            </View>
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

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.default,
})

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
