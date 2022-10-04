import React, {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {OmitUndefined} from '@/types'
import {formatNumber} from '@/utils'

export type BadgeProps = {
  variant?: 'default' | 'small' | 'on-icon'
  /**
   * The value to display in the badge.
   */
  value: number
} & Pick<AccessibilityProps, 'accessible' | 'accessibilityLabel'>

export const Badge = ({
  accessible,
  accessibilityLabel,
  value,
  variant = 'default',
}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale, variant))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <Text
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          numberOfLines={1}
          style={styles.text}>
          {formatNumber(value)}
        </Text>
      </View>
    </Row>
  )
}

type BadgeSize = {
  [v in OmitUndefined<BadgeProps['variant']>]: {
    diameter: number
    text: number
  }
}

const badgeSize: BadgeSize = {
  default: {
    diameter: 22,
    text: 14,
  },
  'on-icon': {
    diameter: 16,
    text: 12,
  },
  small: {
    diameter: 16,
    text: 12,
  },
}

const createStyles =
  (
    fontScale: Device['fontScale'],
    variant: OmitUndefined<BadgeProps['variant']>,
  ) =>
  ({color, size, text}: Theme) => {
    const {diameter, text: textSize} = badgeSize[variant]
    const scalesWithFont = variant !== 'on-icon'
    const scaleFactor = scalesWithFont ? fontScale : 1

    const fontSize = textSize * scaleFactor
    const lineHeight = diameter * scaleFactor
    const minWidth = diameter * scaleFactor

    return StyleSheet.create({
      circle: {
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth, // Prevent the circle becoming a vertical oval
        paddingStart: size.spacing.xs + 0.5, // Nudge center-alignment because of even width
        paddingEnd: size.spacing.xs,
        borderRadius: minWidth / 2,
        backgroundColor: color.pressable.secondary.background,
      },
      text: {
        fontFamily: text.fontWeight.bold,
        fontSize,
        lineHeight,
        color: color.text.inverse,
      },
    })
  }
