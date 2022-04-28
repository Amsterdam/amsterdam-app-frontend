import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '../../styles'
import {Theme, useThemable} from '../../themes'
import {SizeTokens} from '../../themes/tokens'
import {color} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'grey' | 'invalid' | 'white'
  children: ReactNode
  grow?: boolean
  inset?: keyof SizeTokens
  insetHorizontal?: keyof SizeTokens
  insetVertical?: keyof SizeTokens
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
    createStyles({inset, insetHorizontal, insetVertical}),
  )

  const oldStyles = StyleSheet.create({
    box: {
      backgroundColor: background && color.background[background],
    },
  })

  return (
    <View
      style={[oldStyles.box, styles.box, grow && layoutStyles.grow]}
      {...otherProps}>
      {children}
    </View>
  )
}

const createStyles =
  ({inset, insetHorizontal, insetVertical}: Partial<Props>) =>
  (theme: Theme) =>
    StyleSheet.create({
      box: {
        padding:
          inset && !insetHorizontal && !insetVertical ? theme.size[inset] : 0,
        paddingHorizontal: insetHorizontal && theme.size[insetHorizontal],
        paddingVertical: insetVertical && theme.size[insetVertical],
      },
    })
