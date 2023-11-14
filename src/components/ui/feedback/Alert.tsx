import {FC, Fragment, ReactNode, useCallback, useEffect} from 'react'
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {
  AlertCloseType,
  AlertVariant,
  AlertVariantConfig,
} from '@/components/ui/feedback/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBeforeRemove} from '@/hooks/navigation/useBeforeRemove'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {resetAlert, selectAlert} from '@/store/slices/alert'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {Duration} from '@/types/duration'
import {accessibleText} from '@/utils/accessibility/accessibleText'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Alert = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.Long)
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  const alert = useSelector(selectAlert)
  const {closeType, content, testID, variant, withIcon} = alert
  const variantConfig = useThemable(createVariantConfig)
  const iconName = variantConfig[variant ?? AlertVariant.information].iconName

  const styles = useThemable(createStyles(variant, variantConfig))

  const reset = useCallback(() => dispatch(resetAlert()), [dispatch])

  useBeforeRemove(reset)

  useEffect(() => {
    reset() // triggers when navigation navigates to new screen
  }, [reset])

  if (!alert.content) {
    return null
  }

  const WrapperComponent: FC<{children: ReactNode}> =
    closeType === AlertCloseType.withoutButton
      ? props => (
          <Pressable
            accessibilityLanguage="nl-NL"
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
    <Box>
      <WrapperComponent>
        <View
          accessibilityLanguage="nl-NL"
          accessibilityRole="alert"
          accessible
          ref={setAccessibilityFocus}
          style={styles?.view}
          testID={testID}>
          <Row align="between">
            <SingleSelectable
              accessibilityLabel={accessibleText(content?.title, content?.text)}
              accessibilityLanguage="nl-NL"
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
                  accessibilityLanguage="nl-NL"
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
      </WrapperComponent>
    </Box>
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
