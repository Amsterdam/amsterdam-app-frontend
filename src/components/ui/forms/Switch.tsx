import {ElementType, Fragment, ReactNode} from 'react'
import {
  AccessibilityInfo,
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

  const onPress = () => {
    onChange?.()
    setTimeout(
      () => AccessibilityInfo.announceForAccessibility(value ? 'uit' : 'aan'),
      100,
    )
  }

  return (
    <Pressable
      accessibilityLabel={`${accessibilityLabel} ${value ? 'aan' : 'uit'}`}
      accessibilityRole="switch"
      aria-disabled={disabled}
      onPress={onPress}
      testID={testID}>
      <Wrapper>
        <FormField
          label={label}
          labelPosition={labelPosition}>
          <SwitchRN
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            ios_backgroundColor={color.control.switch.track.background.off}
            onChange={onPress}
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
