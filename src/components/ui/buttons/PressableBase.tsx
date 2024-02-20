import {forwardRef} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as PressableRN,
  // eslint-disable-next-line no-restricted-imports
  PressableProps as PressableRNProps,
  View,
  GestureResponderEvent,
} from 'react-native'
import {TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction} from '@/processes/piwik/types'

export type PressableBaseProps = {
  'sentry-label'?: string
} & PressableRNProps &
  LogProps &
  TestProps

/**
 * Used to build other interactive components, do not use on its own.
 * This is a drop in replacement of the React Native Pressable component.
 * @deprecated Use {@link Pressable} instead.
 */
export const PressableBase = forwardRef<View, PressableBaseProps>(
  (
    {
      children,
      onPress = () => null,
      logAction = PiwikAction.buttonPress,
      onAccessibilityAction,
      ...pressableProps
    },
    ref,
  ) => {
    const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
      ...pressableProps,
      logAction,
    })

    return (
      <PressableRN
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        onAccessibilityAction={event => {
          onAccessibilityAction?.(event)
          onEvent(event, {
            nameSuffix: event.nativeEvent.actionName,
            action: PiwikAction.accessibilityAction,
          })
        }}
        onPress={(event: GestureResponderEvent) => {
          onPress?.(event)
          onEvent(event)
        }}
        ref={ref}
        {...pressableProps}>
        {children}
      </PressableRN>
    )
  },
)
