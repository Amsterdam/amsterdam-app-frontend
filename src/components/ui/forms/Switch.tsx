import React, {ReactNode} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {color} from '../../../tokens'
import {FormField} from '../forms'
import {MainAxisPosition} from '../layout/types'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
} & SwitchRNProps

/**
 * Wraps a switch with its label in a row and takes care of accessibility.
 */
export const Switch = ({
  label,
  labelPosition = 'start',
  onValueChange,
  value,
  ...otherProps
}: Props) => (
  <FormField {...{label, labelPosition}}>
    <SwitchRN
      ios_backgroundColor={color.control.switch.background}
      onValueChange={onValueChange}
      trackColor={{
        false: color.control.switch.off,
        true: color.control.switch.on,
      }}
      thumbColor={color.control.default.background}
      value={value}
      {...otherProps}
    />
  </FormField>
)
