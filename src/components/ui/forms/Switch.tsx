import {type ElementType, Fragment, type ReactNode} from 'react'
import {Switch as SwitchRN, SwitchProps as SwitchRNProps} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {FormField} from '@/components/ui/forms/FormField'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useTheme} from '@/themes/useTheme'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onChange?: () => void
  wrapper?: ElementType
} & Omit<SwitchRNProps, 'onChange'> &
  LogProps &
  TestProps

/**
 * Wraps a switch with its label in a row and takes care of accessibility.
 */
export const Switch = ({
  accessibilityLabel = '',
  disabled = false,
  label,
  labelPosition = 'start',
  logAction = PiwikAction.toggle,
  logDimensions = {},
  onChange,
  testID,
  value,
  wrapper: Wrapper = Fragment,
  ...switchProps
}: Props) => {
  const {color} = useTheme()
  const onPress = usePiwikTrackCustomEventFromProps({
    ...switchProps,
    logAction,
    logDimensions: {
      ...logDimensions,
      // new state is the inverse of value
      [PiwikDimension.newState]: value ? 'unchecked' : 'checked',
    },
    onEvent: onChange,
    testID,
  })

  return (
    <PressableBase
      accessibilityHint="Dubbel tik om onderdeel aan of uit te zetten"
      accessibilityLabel={`${accessibilityLabel} onderdeel staat ${
        value ? 'aan' : 'uit'
      }`}
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
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
    </PressableBase>
  )
}
