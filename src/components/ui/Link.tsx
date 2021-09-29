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
  emphasis?: Boolean
  onPress: () => void
  text: string
}

export const Link = ({direction, emphasis, onPress, text}: Props) => {
  // The `top` style aims to vertically align the icon with the baseline of the text.
  // As SVG isn’t text, and because React’s flexbox implementation differs from the
  // CSS spec, I couldn’t find a better approach yet.
  const iconProps: SVGProps<any> = {
    width: 14,
    height: 14,
    fill: emphasis ? color.touchable.primary : color.font.regular,
    style: {
      top: 3,
    },
  }

  const textJsx = (
    <Text
      accessibilityRole="link"
      style={[styles.text, emphasis && styles.emphasis]}
      onPress={onPress}>
      {text}
    </Text>
  )

  if (!direction) {
    return textJsx
  }

  return (
    <View style={styles.row}>
      {direction === 'backward' && <ChevronLeft {...iconProps} />}
      {direction === 'down' && <ChevronDown {...iconProps} />}
      {direction === 'forward' && <ChevronRight {...iconProps} />}
      {direction === 'up' && <ChevronUp {...iconProps} />}
      <Gutter width={size.spacing.xs} />
      {textJsx}
    </View>
  )
}

const styles = StyleSheet.create({
  emphasis: {
    color: color.touchable.primary,
  },
  text: {
    flexShrink: 1, // Allow wrapping
    fontFamily: font.weight.demi,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    color: color.font.regular,
  },
  row: {
    flexDirection: 'row',
  },
})
