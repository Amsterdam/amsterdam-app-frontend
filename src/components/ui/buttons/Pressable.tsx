import {ReactNode, forwardRef} from 'react'
import {View, StyleSheet} from 'react-native'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Box, BoxProps} from '@/components/ui/containers/Box'
import {LogProps} from '@/processes/piwik/types'
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
} & PressableBaseProps &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'> &
  LogProps

/**
 * Used to build other interactive components, do not use on its own.
 * This is a replacement for the React Native Pressable component, with added Box properties.
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
      ...pressableProps
    },
    ref,
  ) => {
    const styles = useThemable(createStyles(grow, variant))

    return (
      <PressableBase
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
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
      </PressableBase>
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
