import React, {useContext} from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Device, DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  value: number | string
} & Pick<AccessibilityProps, 'accessible'>

export const Badge = ({accessible, value}: BadgeProps) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useThemable(createStyles(fontScale))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <Text accessible={accessible} numberOfLines={1} style={styles.text}>
          {typeof value === 'number' ? formatNumber(value) : value}
        </Text>
      </View>
    </Row>
  )
}

const createStyles =
  (fontScale: Device['fontScale']) =>
  ({color, text}: Theme) => {
    const width = 20 * fontScale
    const height = 20
    const alignmentOffset = 1
    const inset = 2
    const fontSize = 12

    return StyleSheet.create({
      circle: {
        borderRadius: width / 2,
        backgroundColor: color.pressable.secondary.background,
      },
      text: {
        minWidth: width, // Make sure we have at least a circle
        marginTop: alignmentOffset, // Adjust for glyphs not being centered in the font’s line height
        paddingHorizontal: inset, // Use padding for horizontal inset
        textAlign: 'center',
        fontFamily: text.fontWeight.bold,
        fontSize: fontSize,
        lineHeight: height - alignmentOffset, // Use line height for vertical inset, to prevent cut-off glyphs
        color: color.text.inverse,
      },
    })
  }
