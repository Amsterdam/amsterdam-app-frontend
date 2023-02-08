import {ReactNode} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {FormField} from '@/components/ui/forms'
import {MainAxisPosition} from '@/components/ui/layout'
import {useTheme} from '@/themes'

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
  ...switchProps
}: Props) => {
  const {color} = useTheme()

  return (
    <FormField {...{label, labelPosition}}>
      <SwitchRN
        ios_backgroundColor={color.control.switch.background}
        onValueChange={onValueChange}
        thumbColor={color.control.default.background}
        trackColor={{
          false: color.control.switch.off,
          true: color.control.switch.on,
        }}
        value={value}
        {...switchProps}
      />
    </FormField>
  )
}
