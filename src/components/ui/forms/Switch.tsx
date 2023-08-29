import {ReactNode} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {FormField} from '@/components/ui/forms/FormField'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {useTheme} from '@/themes/useTheme'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
} & SwitchRNProps

/**
 * Wraps a switch with its label in a row and takes care of accessibility.
 */
export const Switch = ({
  disabled = false,
  label,
  labelPosition = 'start',
  ...switchProps
}: Props) => {
  const {color} = useTheme()

  return (
    <FormField
      label={label}
      labelPosition={labelPosition}>
      <SwitchRN
        ios_backgroundColor={color.control.switch.track.background.off}
        thumbColor={
          color.control.switch.thumb.background[
            disabled ? 'disabled' : 'enabled'
          ]
        }
        trackColor={{
          false: color.control.switch.track.background.off,
          true: color.control.switch.track.background.on,
        }}
        {...switchProps}
      />
    </FormField>
  )
}
