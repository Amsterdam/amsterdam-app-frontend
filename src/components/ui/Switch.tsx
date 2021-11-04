import React from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {color} from '../../tokens'

type Props = SwitchRNProps

export const Switch = ({onValueChange, value, ...otherProps}: Props) => (
  <SwitchRN
    ios_backgroundColor={color.state.neutral}
    onValueChange={onValueChange}
    trackColor={{
      false: color.state.neutral,
      true: color.state.valid,
    }}
    thumbColor={color.background.white}
    value={value}
    {...otherProps}
  />
)
