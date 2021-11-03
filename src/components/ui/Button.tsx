import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Row} from './layout'
import {Text} from './'

type Props = {
  icon?: React.ReactElement
  text?: string
  variant?: 'inverse' | 'primary' | 'secondary' | 'text'
} & Omit<TouchableOpacityProps, 'style'>

const verticalPadding = (44 - font.height.p1) / 2 // Design system: button height must be 44

export const Button = ({
  disabled,
  icon,
  text,
  variant = 'primary',
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      {...otherProps}>
      <Row gutter="md">
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {text && (
          <Text
            dimmed={disabled === true}
            inverse={variant !== 'text'}
            link={variant === 'text'}
            primary={variant === 'inverse'}>
            {text}
          </Text>
        )}
      </Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: size.spacing.md,
    paddingVertical: verticalPadding,
  },
  disabled: {
    backgroundColor: color.touchable.disabled.background,
  },
  iconContainer: {
    height: 20,
    width: 20,
  },
  inverse: {
    backgroundColor: color.background.white,
    borderColor: color.touchable.primary,
    borderWidth: 1,
    borderStyle: 'solid',
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
