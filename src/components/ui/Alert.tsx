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
import {
  resetAlert,
  selectAlertCloseType,
  selectAlertContent,
  selectAlertWithIcon,
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
  const navigation = useNavigation()

  const closeType = useSelector(selectAlertCloseType)
  const content = useSelector(selectAlertContent)
  const withIcon = useSelector(selectAlertWithIcon)
  const isVisible = useSelector(selectAlertVisibility)
  const variant = useSelector(selectAlertVariant)

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

  const icon =
    variant === 'success' ? (
      <Icon size={24}>
        <Checkmark fill={color.text.default} />
      </Icon>
    ) : (
      <Icon size={24}>
        <AlertIcon fill={color.text.default} />
      </Icon>
    )

  const alertComponent = (
    <Box>
      <View style={styles.view}>
        <Row align="between">
          <SingleSelectable
            accessibilityLabel={accessibleText(content?.title, content?.text)}>
            <Row gutter="md">
              {withIcon && icon}
              <View>
                {!!content?.title && <Title level="h4" text={content?.title} />}
                <Paragraph>{content?.text}</Paragraph>
              </View>
            </Row>
          </SingleSelectable>
          {closeType === 'with-button' && (
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

  if (closeType === 'without-button') {
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
          variant === 'information'
            ? color.box.background.alert
            : color.box.background.white,
        borderWidth: variant === 'information' ? 0 : 2,
        borderColor:
          variant === 'success'
            ? color.severity.positive
            : color.severity.negative,
        padding: size.spacing.md,
      },
    })
