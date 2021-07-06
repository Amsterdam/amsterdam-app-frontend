import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {color} from '../../tokens'
import {Text} from './'

type Props = {
  text: string
  variant?: 'primary'
} & Omit<TouchableOpacityProps, 'style'>

export const Button = ({text, variant = 'primary', ...otherProps}: Props) => {
  return (
    <TouchableOpacity style={styles[variant]} {...otherProps}>
      <Text variant="inverse">{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: color.primary.main,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})
