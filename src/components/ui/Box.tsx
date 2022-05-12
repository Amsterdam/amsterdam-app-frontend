import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '../../styles'
import {Theme, useThemable} from '../../themes'
import {SpacingTokens} from '../../themes/tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  children: ReactNode
  grow?: boolean
  inset?: keyof SpacingTokens
  insetHorizontal?: keyof SpacingTokens
  insetVertical?: keyof SpacingTokens
} & Omit<ViewProps, 'style'>

export const Box = ({
  background,
  children,
  grow,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  ...otherProps
}: Props) => {
  const styles = useThemable(
    createStyles({background, inset, insetHorizontal, insetVertical}),
  )

  return (
    <View style={[styles.box, grow && layoutStyles.grow]} {...otherProps}>
      {children}
    </View>
  )
}

const createStyles =
  ({background, inset, insetHorizontal, insetVertical}: Partial<Props>) =>
  (theme: Theme) =>
    StyleSheet.create({
      box: {
        backgroundColor: background && theme.color.box.background[background],
        padding:
          inset && !insetHorizontal && !insetVertical
            ? theme.size.spacing[inset]
            : 0,
        paddingHorizontal:
          insetHorizontal && theme.size.spacing[insetHorizontal],
        paddingVertical: insetVertical && theme.size.spacing[insetVertical],
      },
    })
