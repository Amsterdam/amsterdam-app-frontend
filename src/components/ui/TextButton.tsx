import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {SVGProps, useState} from 'react'
import {Pressable, StyleSheet, Text} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter} from '.'

type Props = {
  direction?: 'backward' | 'down' | 'forward' | 'up'
  emphasis?: Boolean
  onPress: () => void
  text: string
}

export const TextButton = ({direction, emphasis, onPress, text}: Props) => {
  const [isPressed, setIsPressed] = useState(false)

  const iconColor = () => {
    if (isPressed) {
      return color.touchable.pressed
    }

    if (emphasis) {
      return color.touchable.primary
    }

    return color.font.regular
  }

  // The `top` style aims to vertically align the icon with the baseline of the text.
  // As SVG isn’t text, and because React’s flexbox implementation differs from the
  // CSS spec, I couldn’t find a better approach yet.
  const iconProps: SVGProps<any> = {
    width: 14,
    height: 14,
    fill: iconColor(),
    style: {
      top: 3,
    },
  }

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={size.spacing.sm}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={direction && styles.row}>
      <>
        {direction === 'backward' && <ChevronLeft {...iconProps} />}
        {direction === 'down' && <ChevronDown {...iconProps} />}
        {direction === 'forward' && <ChevronRight {...iconProps} />}
        {direction === 'up' && <ChevronUp {...iconProps} />}
        {direction && <Gutter width={size.spacing.xs} />}
        <Text
          style={[
            styles.text,
            emphasis && styles.emphasis,
            isPressed && styles.pressed,
          ]}>
          {text}
        </Text>
      </>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  emphasis: {
    color: color.touchable.primary,
  },
  pressed: {
    color: color.touchable.pressed,
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
