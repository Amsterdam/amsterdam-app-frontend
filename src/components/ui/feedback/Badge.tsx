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

type BatchSizes = {
  [x in OmitUndefined<BadgeProps['variant']>]: {
    diameter: number
    font: number
  }
}

const batchSizes: BatchSizes = {
  default: {
    diameter: 22,
    font: 14,
  },
  'on-icon': {
    diameter: 16,
    font: 12,
  },
  small: {
    diameter: 16,
    font: 12,
  },
}

const createStyles =
  (
    fontScale: Device['fontScale'],
    variant: OmitUndefined<BadgeProps['variant']>,
  ) =>
  ({color, size, text}: Theme) => {
    const {diameter, font} = batchSizes[variant]
    const scalesWithFont = variant !== 'on-icon'
    const minWidth = diameter * (scalesWithFont ? fontScale : 1)
    const fontSize = font / (scalesWithFont ? 1 : fontScale)
    const lineHeight = diameter / (scalesWithFont ? 1 : fontScale)

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
