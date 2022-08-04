import React, {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  scalesWithText?: boolean
  value: number
} & Pick<AccessibilityProps, 'accessible'>

export const Badge = ({
  accessible,
  scalesWithText = true,
  value,
}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale, scalesWithText))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <Text accessible={accessible} numberOfLines={1} style={styles.text}>
          {formatNumber(value)}
        </Text>
      </View>
    </Row>
  )
}

const createStyles =
  (
    fontScale: Device['fontScale'],
    scalesWithText: BadgeProps['scalesWithText'],
  ) =>
  ({color, size, text}: Theme) => {
    const diameter = 16
    const minWidth = diameter * (scalesWithText ? fontScale : 1)
    const fontSize = 12 / (scalesWithText ? 1 : fontScale)
    const lineHeight = diameter / (scalesWithText ? 1 : fontScale)

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
