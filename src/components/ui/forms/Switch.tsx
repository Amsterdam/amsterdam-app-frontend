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
  const Label = () => (
    <Stretch>
      <SkipInScreenReader>{label}</SkipInScreenReader>
    </Stretch>
  )

  return (
    <Row align="between" valign="center" gutter="sm">
      {labelPosition === 'start' && <Label />}
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
      {labelPosition === 'end' && <Label />}
    </Row>
  )
}
