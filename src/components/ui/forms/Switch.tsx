import React, {ReactElement} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {color} from '../../../tokens'
import {SkipInScreenReader} from '../SkipInScreenReader'
import {Row, Stretch} from '../layout'

type LabelPosition = 'start' | 'end'

type Props = {
  label: ReactElement
  labelPosition?: LabelPosition
} & SwitchRNProps

type LabelProps = {
  children: ReactElement
}

const Label = ({children}: LabelProps) => (
  <Stretch>
    <SkipInScreenReader>{children}</SkipInScreenReader>
  </Stretch>
)

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
  <Row align="between" valign="center" gutter="sm">
    {labelPosition === 'start' && <Label>{label}</Label>}
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
    {labelPosition === 'end' && <Label>{label}</Label>}
  </Row>
)
