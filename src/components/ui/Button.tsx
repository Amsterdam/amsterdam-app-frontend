import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import {color} from '../../tokens'
import {Text} from './'

type Props = {
  icon?: React.ReactElement
  text: string
  variant?: 'primary'
} & Omit<TouchableOpacityProps, 'style'>

export const Button = ({
  icon,
  text,
  variant = 'primary',
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity style={[styles.button, styles[variant]]} {...otherProps}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text inverse>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
  iconContainer: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  primary: {
    backgroundColor: color.primary.main,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})
