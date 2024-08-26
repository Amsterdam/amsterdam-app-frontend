import {Fragment, ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import type {
  AlertProps,
  AlertVariantConfig,
} from '@/components/ui/feedback/alert/Alert.types'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'
import {Duration} from '@/types/duration'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const TEXT_ALIGN_CORRECTION = 3

export type AlertBaseProps = {
  inset?: keyof SpacingTokens
} & AlertProps

type WrapperProps = {
  children: ReactNode
  inset: AlertBaseProps['inset']
}

const Wrapper = ({children, inset}: WrapperProps) => {
  if (inset !== undefined) {
    return <Box inset={inset}>{children}</Box>
  }

  return <Fragment>{children}</Fragment>
}

export const AlertBase = ({
  children,
  hasCloseIcon = false,
  inset,
  testID,
  hasIcon = false,
  text,
  title,
  variant = AlertVariant.information,
}: AlertBaseProps) => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const variantConfig = useThemable(createVariantConfig)
  const iconName = variantConfig[variant].iconName
  const styles = useThemable(createStyles(variant, variantConfig))

  const hasContent = !!text || !!title || !!children

  if (!hasContent) {
    return null
  }

  return (
    <Wrapper inset={inset}>
      <View testID={`${testID}Wrapper`}>
        <View
          accessibilityLanguage="nl-NL"
          accessibilityRole="alert"
          accessible
          ref={setAccessibilityFocus}
          style={styles?.view}
          testID={testID}>
          {children ? (
            children
          ) : (
            <Row align="between">
              <SingleSelectable
                accessibilityLabel={accessibleText(title, text)}
                accessibilityLanguage="nl-NL"
                accessibilityRole="alert">
                <Row gutter="md">
                  {!!hasIcon && (
                    <View style={styles?.iconWrapper}>
                      <Icon
                        name={iconName}
                        size="lg"
                        testID={`${testID}Icon`}
                      />
                    </View>
                  )}
                  <Column shrink={1}>
                    {!!title && (
                      <Title
                        level="h4"
                        text={title}
                      />
                    )}
                    <Paragraph>{text}</Paragraph>
                  </Column>
                </Row>
              </SingleSelectable>
              {!!hasCloseIcon && (
                <View>
                  <Icon
                    name="close"
                    size="lg"
                    testID={`${testID}CloseIcon`}
                  />
                </View>
              )}
            </Row>
          )}
        </View>
      </View>
    </Wrapper>
  )
}

const createVariantConfig = ({color}: Theme): AlertVariantConfig => ({
  [AlertVariant.information]: {
    backgroundColor: color.alert.information.background,
    borderColor: color.alert.information.border,
    borderWidth: 2,
    iconName: 'info',
  },
  [AlertVariant.negative]: {
    backgroundColor: color.alert.negative.background,
    borderColor: color.alert.negative.border,
    borderWidth: 2,
    iconName: 'error',
  },
  [AlertVariant.positive]: {
    backgroundColor: color.alert.positive.background,
    borderColor: color.alert.positive.border,
    borderWidth: 2,
    iconName: 'circle-check-mark',
  },
  [AlertVariant.warning]: {
    backgroundColor: color.alert.warning.background,
    borderColor: color.alert.warning.border,
    borderWidth: 2,
    iconName: 'alert',
  },
})

const createStyles =
  (variant: AlertVariant, variantConfig: AlertVariantConfig) =>
  ({size}: Theme) => {
    if (!variant) {
      return
    }

    const {backgroundColor, borderColor, borderWidth} = variantConfig[variant]

    return StyleSheet.create({
      iconWrapper: {
        top: TEXT_ALIGN_CORRECTION,
      },
      view: {
        backgroundColor,
        borderWidth,
        borderColor,
        paddingHorizontal: size.spacing.lg,
        paddingVertical: size.spacing.md,
      },
    })
  }
