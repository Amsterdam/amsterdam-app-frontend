import {Fragment, ReactNode, useCallback, useEffect, useRef} from 'react'
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
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
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
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

type WrapperProps = {
  children: ReactNode
  closeType: AlertCloseType
  onPress: () => void
}

const Wrapper = ({onPress, closeType, ...props}: WrapperProps) => {
  if (closeType !== AlertCloseType.withoutButton) {
    return (
      <PressableBase
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        onPress={onPress}
        {...props}
      />
    )
  }

  return <Fragment {...props} />
}

export const Alert = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const ref = useRef(null)

  const alert = useSelector(selectAlert)
  const {closeType, content, testID, variant, withIcon} = alert
  const variantConfig = useThemable(createVariantConfig)
  const iconName = variantConfig[variant ?? AlertVariant.information].iconName

  const styles = useThemable(createStyles(variant, variantConfig))

  const reset = useCallback(() => dispatch(resetAlert()), [dispatch])

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    dispatch(resetAlert())
  }

  useBlurEffect(reset)

  useEffect(() => {
    if (ref.current && alert.content) {
      setAccessibilityFocus(ref.current)
    }
  }, [alert.content, setAccessibilityFocus])

  if (!alert.content) {
    return null
  }

  return (
    <Box>
      <Wrapper
        closeType={closeType}
        onPress={onPress}>
        <View
          accessibilityLanguage="nl-NL"
          accessibilityRole="alert"
          accessible
          ref={ref}
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
      </Wrapper>
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
