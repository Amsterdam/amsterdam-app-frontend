import AlertIcon from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import {useNavigation} from '@react-navigation/core'
import React, {ElementType, SVGProps, useEffect} from 'react'
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
import {accessibleText} from '@/utils'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export enum AlertCloseType {
  withButton = 'withButton',
  withoutButton = 'withoutButton',
}

export enum AlertVariant {
  default = 'default',
  failure = 'failure',
  success = 'success',
}

type AlertVariantConfig = {
  [v in AlertVariant]: {
    backgroundColor: string
    borderColor: string
    borderWidth: number
    icon: ElementType
  }
}

export const Alert = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const {
    closeType,
    content,
    isVisible,
    variant = AlertVariant.default,
    withIcon,
  } = useSelector(selectAlert)

  const iconProps = useThemable(createIconProps)
  const variantConfig = useThemable(createVariantConfig)
  const styles = useThemable(createStyles(variant, variantConfig))

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

  const IconComponent = variantConfig[variant].icon

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
          {closeType === AlertCloseType.withButton && (
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

  if (closeType === AlertCloseType.withoutButton) {
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
  (variant: AlertVariant, variantConfig: AlertVariantConfig) =>
  ({size}: Theme) => {
    const {backgroundColor, borderColor, borderWidth} = variantConfig[variant]

    return StyleSheet.create({
      view: {
        backgroundColor,
        borderWidth,
        borderColor,
        paddingHorizontal: size.spacing.lg,
        paddingVertical: size.spacing.md,
      },
    })
  }

const createVariantConfig = ({color}: Theme): AlertVariantConfig => ({
  [AlertVariant.default]: {
    backgroundColor: color.box.background.alert,
    borderColor: color.box.background.alert,
    borderWidth: 2,
    icon: AlertIcon,
  },
  [AlertVariant.failure]: {
    backgroundColor: color.box.background.white,
    borderColor: color.severity.negative,
    borderWidth: 2,
    icon: AlertIcon,
  },
  [AlertVariant.success]: {
    backgroundColor: color.box.background.white,
    borderColor: color.severity.positive,
    borderWidth: 2,
    icon: Checkmark,
  },
})
