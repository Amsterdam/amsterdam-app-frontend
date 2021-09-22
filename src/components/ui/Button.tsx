import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter, Text} from './'

const arrowWidth = 18

type Props = {
  icon?: React.ReactElement
  text?: string
  variant?: 'inverse' | 'next' | 'primary' | 'secondary' | 'text'
} & Omit<TouchableOpacityProps, 'style'>

export const Button = ({
  icon,
  text,
  variant = 'primary',
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.button, styles[variant]]}
      {...otherProps}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {icon && text && <Gutter width={size.spacing.md} />}
      {text && (
        <Text
          inverse={variant !== 'text'}
          primary={variant === 'inverse'}
          link={variant === 'text'}>
          {text}
        </Text>
      )}
      {variant === 'next' && <View style={styles.nextArrow} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
  },
  iconContainer: {
    height: 20,
    width: 20,
  },
  inverse: {
    backgroundColor: color.background.lighter,
    borderColor: color.touchable.primary,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  next: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: color.touchable.secondary,
    paddingRight: arrowWidth + size.spacing.sm,
    paddingVertical: size.spacing.md,
  },
  nextArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: color.background.lighter,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderTopWidth: font.height.t1 / 2 + size.spacing.md + 2, // the + 2 might be because of the demi font-family
    borderRightColor: 'transparent',
    borderRightWidth: 0,
    borderBottomColor: 'transparent',
    borderBottomWidth: font.height.t1 / 2 + size.spacing.md + 2, // the + 2 might be because of the demi font-family
    borderLeftColor: color.touchable.secondary,
    borderLeftWidth: arrowWidth,
  },
  primary: {
    backgroundColor: color.touchable.primary,
  },
  secondary: {
    backgroundColor: color.touchable.secondary,
  },
  text: {
    backgroundColor: undefined,
    color: color.touchable.primary,
    paddingHorizontal: size.spacing.sm,
  },
})
