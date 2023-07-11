import {useNavigation} from '@react-navigation/core'
import {FC, Fragment, ReactNode, useEffect} from 'react'
import {
  AccessibilityInfo,
  LayoutAnimation,
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
import {useIsReduceMotionEnabled} from '@/hooks'
import {resetAlert, selectAlert} from '@/store/slices/alert'
import {Theme, useThemable} from '@/themes'
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
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  const alert = useSelector(selectAlert)
  const {closeType, content, testID, variant, withIcon} = alert
  const variantConfig = useThemable(createVariantConfig)
  const iconName = variantConfig[variant ?? AlertVariant.information].iconName

  const styles = useThemable(createStyles(variant, variantConfig))

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        //triggers only when moving back in navigation stack
        dispatch(resetAlert())
      }),
    [dispatch, navigation],
  )

  useEffect(() => {
    dispatch(resetAlert()) // triggers when navigation navigates to new screen
  }, [dispatch])

  useEffect(() => {
    if (content) {
      AccessibilityInfo.announceForAccessibility(content.text)
    }
  }, [content])

  if (!alert.content) {
    return null
  }

  const WrapperComponent: FC<{children: ReactNode}> =
    closeType === AlertCloseType.withoutButton
      ? props => (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              if (!isReduceMotionEnabled) {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                )
              }
              dispatch(resetAlert())
            }}
            {...props}
          />
        )
      : Fragment

  return (
    <WrapperComponent>
      <Box>
        <View
          style={styles?.view}
          testID={testID}>
          <Row align="between">
            <SingleSelectable
              accessibilityLabel={accessibleText(content?.title, content?.text)}
              accessibilityRole="alert">
              <Row gutter="md">
                {!!withIcon && (
                  <Icon
                    color="link"
                    name={iconName}
                    size="lg"
                  />
                )}
                <Column>
                  {!!content?.title && (
                    <Title
                      level="h4"
                      text={content?.title}
                    />
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
                    <Icon
                      color="link"
                      name="close"
                      size="lg"
                    />
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
