import React from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {color} from '../../tokens'

type Props = SwitchRNProps

export const Switch = ({onValueChange, value, ...otherProps}: Props) => (
  <SwitchRN
    ios_backgroundColor="#3e3e3e"
    onValueChange={onValueChange}
    trackColor={{
      false: color.touchable.disabled.foreground,
      true: color.severity.valid,
    }}
    thumbColor={color.background.white}
    value={value}
    {...otherProps}
  />
)
