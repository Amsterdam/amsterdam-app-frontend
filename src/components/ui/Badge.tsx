import React, {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  value: number
} & Pick<AccessibilityProps, 'accessible'>

export const Badge = ({accessible, value}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale))

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
  (fontScale: Device['fontScale']) =>
  ({color, size, text}: Theme) => {
    const circleSize = 16
    const scaledCircleSize = circleSize * fontScale

    return StyleSheet.create({
      circle: {
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: scaledCircleSize, // Make sure we have at least a circle
        paddingStart: size.spacing.xs + 0.5, // Nudge center-alignment in even width
        paddingEnd: size.spacing.xs,
        borderRadius: scaledCircleSize / 2,
        backgroundColor: color.pressable.secondary.background,
      },
      text: {
        fontFamily: text.fontWeight.bold,
        fontSize: 12,
        lineHeight: circleSize,
        color: color.text.inverse,
      },
    })
  }
