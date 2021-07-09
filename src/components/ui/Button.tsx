import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {color} from '../../tokens'

type Props = {
  backgroundColor?: string
  children: React.ReactNode
  variant?: 'primary'
} & TouchableOpacityProps

export const Button = ({children, style, variant, ...otherProps}: Props) => {
  return (
    <TouchableOpacity
      style={[variant && styles[variant], style]}
      {...otherProps}>
      {children}
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
