import {forwardRef} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as PressableRN,
  // eslint-disable-next-line no-restricted-imports
  PressableProps as PressableRNProps,
  View,
  GestureResponderEvent,
} from 'react-native'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'

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
      logDimensions,
      logValue,
      onAccessibilityAction,
      ...pressableProps
    },
    ref,
  ) => {
    const {trackCustomEvent} = usePiwik()

    return (
      <PressableRN
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        onAccessibilityAction={event => {
          onAccessibilityAction?.(event)
          const logName = getLogNameFromProps(pressableProps)

          if (logName) {
            trackCustomEvent(
              `${logName}:${event.nativeEvent.actionName}`,
              PiwikAction.accessibilityAction,
              logDimensions,
              logCategory,
              logValue,
            )
          }
        }}
        onPress={(event: GestureResponderEvent) => {
          onPress?.(event)
          const logName = getLogNameFromProps(pressableProps)

          if (logName) {
            trackCustomEvent(
              logName,
              logAction,
              logDimensions,
              logCategory,
              logValue,
            )
          }
        }}
        ref={ref}
        {...pressableProps}>
        {children}
      </PressableRN>
    )
  },
)
