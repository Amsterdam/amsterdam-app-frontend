import React from 'react'
import {TouchableOpacityProps, TouchableOpacity, StyleSheet} from 'react-native'
import {colors} from '../shared/constants'
import {setSpacing} from '../../utils/setSpacing'
import Text from './Text'

type ButtonProps = {
  text: string
} & TouchableOpacityProps

const Button = ({style, text, ...otherProps}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...otherProps}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.main,
    paddingVertical: setSpacing(3),
    paddingHorizontal: setSpacing(4),
  },
  buttonText: {
    fontFamily: 'AvenirNext-DemiBold',
    color: 'white',
  },
})

export default Button
