import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import Cancel from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {SVGProps, useState} from 'react'
import {Pressable, StyleSheet, Text} from 'react-native'
import {color, font, size} from '../../tokens'
import {Row} from './layout'

type Props = {
  direction?: 'backward' | 'down' | 'forward' | 'up'
  icon?: 'cancel'
  emphasis?: boolean
  onPress: () => void
  text: string
}

export const TextButton = ({
  direction,
  emphasis,
  icon,
  onPress,
  text,
}: Props) => {
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
      style={[styles.button, direction && styles.row]}>
      <Row gutter="xs">
        {direction === 'backward' && <ChevronLeft {...iconProps} />}
        {direction === 'down' && <ChevronDown {...iconProps} />}
        {direction === 'forward' && <ChevronRight {...iconProps} />}
        {direction === 'up' && <ChevronUp {...iconProps} />}
        {icon === 'cancel' && <Cancel {...iconProps} />}
        <Text
          style={[
            styles.text,
            emphasis && styles.emphasis,
            isPressed && styles.pressed,
          ]}>
          {text}
        </Text>
      </Row>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexShrink: 1,
  },
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
