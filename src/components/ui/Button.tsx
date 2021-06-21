import React from 'react'
import {TouchableOpacityProps, TouchableOpacity, StyleSheet} from 'react-native'
import colors from '../../tokens/colors'
import themeSpacing from '../../utils/themeSpacing'
import Text from './Text'

type Props = {
  text: string
  variant?: 'primary'
} & TouchableOpacityProps

type PropsWithoutStyle = Omit<Props, 'style'>

const Button = ({
  text,
  variant = 'primary',
  ...otherProps
}: PropsWithoutStyle) => {
  return (
    <TouchableOpacity style={styles[variant]} {...otherProps}>
      <Text variant="buttonPrimary">{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary.main,
    paddingVertical: themeSpacing(3),
    paddingHorizontal: themeSpacing(4),
  },
})

export default Button
