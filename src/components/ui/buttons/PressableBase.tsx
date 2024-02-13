import {forwardRef} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as PressableRN,
  // eslint-disable-next-line no-restricted-imports
  PressableProps as PressableRNProps,
  View,
  GestureResponderEvent,
} from 'react-native'
import {devError} from '@/processes/development'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction} from '@/processes/piwik/types'

export type PressableBaseProps = {
  'sentry-label'?: string
} & PressableRNProps &
  Partial<LogProps>

/**
 * Used to build other interactive components, do not use on its own.
 */
export const PressableBase = forwardRef<View, PressableBaseProps>(
  (
    {
      children,
      onPress = () => null,
      logAction = PiwikAction.buttonPress,
      logCategory,
      logName,
      logDimensions,
      logValue,
      ...pressableProps
    },
    ref,
  ) => {
    const {trackCustomEvent} = usePiwik()

    return (
      <PressableRN
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        onPress={(event: GestureResponderEvent) => {
          onPress?.(event)
          const name =
            logName ?? pressableProps['sentry-label'] ?? pressableProps.testID

          if (name) {
            trackCustomEvent(
              name,
              logAction,
              logDimensions,
              logCategory,
              logValue,
            )
          } else {
            devError('No name found for component')
          }
        }}
        ref={ref}
        {...pressableProps}>
        {children}
      </PressableRN>
    )
  },
)
