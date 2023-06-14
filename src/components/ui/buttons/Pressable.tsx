import {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui/containers'
import {Theme, useThemable} from '@/themes'

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
        {...{inset, insetHorizontal, insetVertical}}>
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
        flex: grow ? 1 : undefined,
        backgroundColor: color.pressable[variant].default,
      },
      pressed: {
        backgroundColor: color.pressable[variant].highlight,
      },
    })
