import React, {ReactNode} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {useSelector} from 'react-redux'
import {FormField} from '@/components/ui/forms'
import {MainAxisPosition} from '@/components/ui/layout'
import {selectTheme} from '@/themes'

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
}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)

  return (
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
}
