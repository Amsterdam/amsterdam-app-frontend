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
  ({size}: Theme) =>
    StyleSheet.create({
      gutter: {
        width: width && size.spacing[width],
        height: height && size.spacing[height],
      },
    })
