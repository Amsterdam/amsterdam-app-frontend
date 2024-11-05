import {
  AccessibilityProps,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
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
  value: number
  /**
   * Which variant of the badge to display.
   */
  variant?: 'default' | 'on-icon' | 'small'
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
        <Text
          accessibilityLabel={accessibilityLabel}
          accessibilityLanguage={accessibilityLanguage}
          accessible={variant !== 'on-icon'}
          numberOfLines={1}
          style={styles.text}
          testID={testID}>
          {formatNumber(value)}
        </Text>
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
    value: number,
  ) =>
  ({color, text}: Theme) => {
    const fontSize = text.fontSize[variant === 'small' ? 'small' : 'body']
    const scalesWithFont = variant !== 'on-icon'
    const scaleFactor = scalesWithFont ? fontScale : 1
    const marginFactor = value > 9 ? MARGIN_DOUBLE_DIGIT : MARGIN_SINGLE_DIGIT

    const scaledDiameter = marginFactor * scaleFactor * fontSize

    return StyleSheet.create({
      circle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scaledDiameter,
        width: scaledDiameter,
        borderRadius: scaledDiameter / 2,
        backgroundColor: color.badge.background,
      },
      text: {
        fontFamily:
          variant === 'default'
            ? text.fontFamily.regular
            : text.fontFamily.bold,
        fontSize,
        color: color.text.inverse,
        bottom: Platform.OS === 'android' ? 2 : 1 * fontScale,
      },
    })
  }
