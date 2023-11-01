import {ElementType, Fragment, ReactNode} from 'react'
import {
  Pressable,
  Switch as SwitchRN,
  SwitchProps as SwitchRNProps,
} from 'react-native'
import {FormField} from '@/components/ui/forms/FormField'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {useTheme} from '@/themes/useTheme'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onChange?: () => void
  wrapper?: ElementType
} & Omit<SwitchRNProps, 'onChange'>

/**
 * Wraps a switch with its label in a row and takes care of accessibility.
 */
export const Switch = ({
  accessibilityLabel = '',
  disabled = false,
  label,
  labelPosition = 'start',
  onChange,
  testID,
  value,
  wrapper: Wrapper = Fragment,
  ...switchProps
}: Props) => {
  const {color} = useTheme()

  return (
    <Pressable
      accessibilityHint="Dubbel tik om onderdeel aan of uit te zetten"
      accessibilityLabel={`${accessibilityLabel} onderdeel staat ${
        value ? 'aan' : 'uit'
      }`}
      accessibilityRole="button"
      aria-disabled={disabled}
      onPress={onChange}
      testID={testID}>
      <Wrapper>
        <FormField
          label={label}
          labelPosition={labelPosition}>
          <SwitchRN
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            ios_backgroundColor={color.control.switch.track.background.off}
            onChange={onChange}
            thumbColor={
              color.control.switch.thumb.background[
                disabled ? 'disabled' : 'enabled'
              ]
            }
            trackColor={{
              false: color.control.switch.track.background.off,
              true: color.control.switch.track.background.on,
            }}
            value={value}
            {...switchProps}
          />
        </FormField>
      </Wrapper>
    </Pressable>
  )
}
