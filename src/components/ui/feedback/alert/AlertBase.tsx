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
  const iconName = variantConfig[variant ?? AlertVariant.information].iconName
  const styles = useThemable(createStyles(variant, variantConfig))

  const hasContent = !!text || !!title

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
          <Row align="between">
            <SingleSelectable
              accessibilityLabel={accessibleText(title, text)}
              accessibilityLanguage="nl-NL"
              accessibilityRole="alert">
              <Row gutter="md">
                {!!hasIcon && (
                  <Icon
                    name={iconName}
                    size="lg"
                    testID={`${testID}Icon`}
                  />
                )}
                <Column>
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
        </View>
      </View>
    </Wrapper>
  )
}

const createVariantConfig = ({color}: Theme): AlertVariantConfig => ({
  [AlertVariant.information]: {
    backgroundColor: color.box.background.alert,
    borderColor: color.box.background.alert,
    borderWidth: 2,
    iconName: 'info',
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
