import React, {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {formatNumber} from '@/utils'

export type BadgeProps = {
  /**
   * Whether the icon scales with text being zoomed in or out.
   */
  scalesWithFont?: boolean
  /**
   * The value to display in the badge.
   */
  value: number
} & Pick<AccessibilityProps, 'accessible' | 'accessibilityLabel'>

export const Badge = ({
  accessible,
  accessibilityLabel,
  scalesWithFont = true,
  value,
}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale, scalesWithFont))

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

const createStyles =
  (
    fontScale: Device['fontScale'],
    scalesWithFont: BadgeProps['scalesWithFont'],
  ) =>
  ({color, size, text}: Theme) => {
    const diameter = 16
    const minWidth = diameter * (scalesWithFont ? fontScale : 1)
    const fontSize = 12 / (scalesWithFont ? 1 : fontScale)
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
