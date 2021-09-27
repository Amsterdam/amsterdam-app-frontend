import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {SVGProps} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter} from './'

type Props = {
  direction?: 'backward' | 'down' | 'forward' | 'up'
  emphasis?: Boolean // Bold black text instead of regular blue
  onPress: () => void
  text: string
}

export const Link = ({direction, emphasis, onPress, text}: Props) => {
  // The `top` style aims to vertically align the icon with the baseline of the text.
  // As SVG isn’t text, and because React’s flexbox implementation differs from the
  // CSS spec, I couldn’t find a better approach yet.
  const getIconProps: () => SVGProps<any> = () => {
    const iconSize =
      direction === 'down' || direction === 'up'
        ? font.size.p1 * 0.75
        : font.size.p1
    return {
      width: iconSize,
      height: iconSize,
      fill: emphasis ? color.font.regular : color.touchable.primary,
      style: {
        top: (font.height.p1 - iconSize) / 2,
      },
    }
  }

  const textJsx = (
    <Text
      accessibilityRole="link"
      style={[styles.text, emphasis ? styles.emphasis : styles.notEmphasis]}
      onPress={onPress}>
      {text}
    </Text>
  )

  return direction ? (
    <View style={styles.row}>
      {direction === 'backward' && <ChevronLeft {...getIconProps()} />}
      {direction === 'down' && <ChevronDown {...getIconProps()} />}
      {direction === 'forward' && <ChevronRight {...getIconProps()} />}
      {direction === 'up' && <ChevronUp {...getIconProps()} />}
      <Gutter width={size.spacing.sm} />
      {textJsx}
    </View>
  ) : (
    textJsx
  )
}

const styles = StyleSheet.create({
  emphasis: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
  },
  text: {
    flexShrink: 1, // Allow wrapping
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
  },
  notEmphasis: {
    fontFamily: font.weight.regular,
    color: color.touchable.primary,
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
  },
})
