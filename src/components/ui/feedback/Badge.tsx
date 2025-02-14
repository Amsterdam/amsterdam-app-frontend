import {AccessibilityProps, StyleSheet, View} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Device} from '@/providers/device.provider'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {OmitUndefined} from '@/types/undefined'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  /**
   * The value to display in the badge.
   */
  value?: number
  /**
   * Which variant of the badge to display.
   */
  variant?: 'default' | 'on-icon' | 'small' | 'extraSmall'
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  TestProps

export const Badge = ({
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  testID,
  value,
  variant = 'default',
}: BadgeProps) => {
  const {fontScale} = useDeviceContext()
  const styles = useThemable(createStyles(fontScale, variant, value))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <AccessibleText
          accessibilityLabel={accessibilityLabel}
          accessibilityLanguage={accessibilityLanguage}
          accessible={variant !== 'on-icon'}
          numberOfLines={1}
          style={styles.text}
          testID={testID}>
          {!!value && formatNumber(value)}
        </AccessibleText>
      </View>
    </Row>
  )
}

const MARGIN_SINGLE_DIGIT = 1.2
const MARGIN_DOUBLE_DIGIT = 1.4

const createStyles =
  (
    fontScale: Device['fontScale'],
    variant: OmitUndefined<BadgeProps['variant']>,
    value: number = 0,
  ) =>
  ({color, text, border}: Theme) => {
    const fontSize =
      text.fontSize[
        variant === 'extraSmall'
          ? 'extraSmall'
          : variant === 'small'
            ? 'small'
            : 'body'
      ]
    const scaleFactor =
      variant === 'on-icon' ? 1 + (fontScale - 1) / 2 : fontScale
    const isDoubleDigitValue = value > 9
    const marginFactor = isDoubleDigitValue
      ? MARGIN_DOUBLE_DIGIT
      : MARGIN_SINGLE_DIGIT

    const scaledDiameter = marginFactor * scaleFactor * fontSize

    const scaledFontSize = (fontSize / fontScale) * scaleFactor

    return StyleSheet.create({
      circle: {
        height: scaledDiameter,
        width: scaledDiameter,
        borderRadius: scaledDiameter / 2,
        backgroundColor: color.badge.background,
        borderWidth: border.width.sm,
        borderColor: color.badge.border,
      },
      text: {
        fontFamily: text.fontFamily.bold,
        fontSize: scaledFontSize,
        lineHeight: scaledFontSize * 1.28,
        bottom: isDoubleDigitValue ? 0 : fontScale, // for some reason vertical correction is needed only for single digit
        color: color.text.inverse,
        textAlign: 'center',
      },
    })
  }
