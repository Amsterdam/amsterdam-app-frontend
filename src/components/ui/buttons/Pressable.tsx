import {TrackCustomEventOptions} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {ReactNode, forwardRef} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui/containers/Box'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type PressableVariant = 'primary' | 'tertiary' | 'negative' | 'transparent'

export type PressableProps = {
  children: ReactNode
  /**
   * Whether the button grows to fill its parent container.
   */
  grow?: boolean
  'sentry-label'?: string
  variant?: PressableVariant
} & PressableRNProps &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'> &
  Partial<LogProps>

/**
 * Used to build other interactive components, do not use on its own.
 */
export const Pressable = forwardRef<View, PressableProps>(
  (
    {
      children,
      grow,
      inset = 'no',
      insetHorizontal,
      insetVertical,
      variant = 'tertiary',
      onPress = () => null,
      logAction = PiwikAction.buttonPress,
      logCategory,
      logName,
      logDimensions,
      ...pressableProps
    },
    ref,
  ) => {
    const styles = useThemable(createStyles(grow, variant))

    const {trackCustomEvent, suggestedCategory} = usePiwik()

    return (
      <PressableRN
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        onPress={(event: GestureResponderEvent) => {
          onPress?.(event)
          trackCustomEvent(logCategory ?? suggestedCategory, logAction, {
            name:
              logName ??
              pressableProps['sentry-label'] ??
              pressableProps.testID,
            customDimensions:
              logDimensions as TrackCustomEventOptions['customDimensions'],
          })
        }}
        ref={ref}
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        {...pressableProps}>
        <Box
          grow
          inset={inset}
          insetHorizontal={insetHorizontal}
          insetVertical={insetVertical}>
          {children}
        </Box>
      </PressableRN>
    )
  },
)

const createStyles =
  (grow: PressableProps['grow'], variant: PressableVariant) =>
  ({color}: Theme) =>
    StyleSheet.create({
      button: {
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].default
            : undefined,
        flex: grow ? 1 : undefined,
        flexShrink: grow ? 0 : 1,
      },
      pressed: {
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].highlight
            : undefined,
      },
    })
