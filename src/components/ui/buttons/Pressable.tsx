import {ReactNode, forwardRef} from 'react'
import {View, StyleSheet} from 'react-native'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Box, BoxProps} from '@/components/ui/containers/Box'
import {type TestProps} from '@/components/ui/types'
import {LogProps} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type PressableVariant = 'primary' | 'tertiary' | 'transparent'

export type PressableProps = {
  children: ReactNode
  'logging-label'?: string
  variant?: PressableVariant
} & PressableBaseProps &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'> &
  LogProps &
  TestProps

/**
 * Used to build other interactive components, do not use on its own.
 * This is a replacement for the React Native Pressable component, with added Box properties.
 */
export const Pressable = forwardRef<View, PressableProps>(
  (
    {
      children,
      inset = 'no',
      insetHorizontal,
      insetVertical,
      variant = 'tertiary',
      ...pressableProps
    },
    ref,
  ) => {
    const styles = useThemable(createStyles(variant))

    return (
      <PressableBase
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        ref={ref}
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        {...pressableProps}>
        <Box
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
  (variant: PressableVariant) =>
  ({color}: Theme) =>
    StyleSheet.create({
      button: {
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].default.background
            : undefined,
      },
      pressed: {
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].pressed.background
            : undefined,
      },
    })
