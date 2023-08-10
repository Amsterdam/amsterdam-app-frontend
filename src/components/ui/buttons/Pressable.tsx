import {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui/containers/Box'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type PressableVariant = 'primary' | 'tertiary' | 'negative'

export type PressableProps = {
  children: ReactNode
  /**
   * Whether the button grows to fill its parent container.
   */
  grow?: boolean
  variant?: PressableVariant
} & Omit<PressableRNProps, 'style'> &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'>

/**
 * Used to build other interactive components, do not use on its own.
 */
export const Pressable = ({
  children,
  grow,
  inset = 'no',
  insetHorizontal,
  insetVertical,
  variant = 'tertiary',
  ...pressableProps
}: PressableProps) => {
  const styles = useThemable(createStyles(grow, variant))

  return (
    <PressableRN
      accessibilityRole="button"
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
}

const createStyles =
  (grow: PressableProps['grow'], variant: PressableVariant) =>
  ({color}: Theme) =>
    StyleSheet.create({
      button: {
        backgroundColor: color.pressable[variant].default,
        flex: grow ? 1 : undefined,
        flexShrink: grow ? 0 : 1,
      },
      pressed: {
        backgroundColor: color.pressable[variant].highlight,
      },
    })
