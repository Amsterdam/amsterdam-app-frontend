import AlertIcon from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import {useNavigation} from '@react-navigation/core'
import React, {FC, Fragment, ReactNode, SVGProps, useEffect} from 'react'
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
import {
  AlertCloseType,
  AlertVariant,
  AlertVariantConfig,
} from '@/components/ui/feedback/Alert.types'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {resetAlert, selectAlert} from '@/store/alertSlice'
import {Theme, useThemable} from '@/themes'
import {accessibleText, isEmptyObject} from '@/utils'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const alert = useSelector(selectAlert)

  const {closeType, content, variant, withIcon} = alert

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

  if (isEmptyObject(alert)) {
    return null
  }

  const IconComponent = variantConfig[variant].icon

  const WrapperComponent: FC<{children: ReactNode}> =
    closeType === AlertCloseType.withoutButton
      ? props => <Pressable onPress={() => dispatch(resetAlert())} {...props} />
      : Fragment

  return (
    <WrapperComponent>
      <Box>
        <View style={styles?.view}>
          <Row align="between">
            <SingleSelectable
              accessibilityRole="alert"
              accessibilityLabel={accessibleText(
                content?.title,
                content?.text,
              )}>
              <Row gutter="md">
                {!!withIcon && (
                  <Icon size={24}>
                    <IconComponent {...iconProps} />
                  </Icon>
                )}
                <Column>
                  {!!content?.title && (
                    <Title level="h4" text={content?.title} />
                  )}
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
                  onPress={() => dispatch(resetAlert())}
                />
              </View>
            )}
          </Row>
        </View>
      </Box>
    </WrapperComponent>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.default,
})

const createStyles =
  (variant: AlertVariant, variantConfig: AlertVariantConfig) =>
  ({size}: Theme) => {
    if (!variant) {
      return
    }
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
