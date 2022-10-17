import {useNavigation} from '@react-navigation/core'
import React, {FC, Fragment, ReactNode, useEffect} from 'react'
import {
  InteractionManager,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
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

  const variantConfig = useThemable(createVariantConfig)
  const iconName = variantConfig[variant ?? AlertVariant.information].iconName
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
                {!!withIcon && <Icon color="link" name={iconName} size={24} />}
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
                  icon={<Icon color="link" name="close" size={24} />}
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
  [AlertVariant.information]: {
    backgroundColor: color.box.background.alert,
    borderColor: color.box.background.alert,
    borderWidth: 2,
    iconName: 'alert',
  },
  [AlertVariant.negative]: {
    backgroundColor: color.box.background.white,
    borderColor: color.severity.negative,
    borderWidth: 2,
    iconName: 'alert',
  },
  [AlertVariant.positive]: {
    backgroundColor: color.box.background.white,
    borderColor: color.severity.positive,
    borderWidth: 2,
    iconName: 'checkmark',
  },
})
