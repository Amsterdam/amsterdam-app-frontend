import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {SpacingTokens} from '../../../themes/tokens'

type Props = {
  height?: keyof SpacingTokens
  width?: keyof SpacingTokens
}

export const Gutter = ({width, height}: Props) => {
  const styles = useThemable(createStyles({width, height}))

  return <View style={styles.gutter} />
}

const createStyles =
  ({width, height}: Props) =>
  (theme: Theme) =>
    StyleSheet.create({
      gutter: {
        width: width && theme.size.spacing[width],
        height: height && theme.size.spacing[height],
      },
    })
