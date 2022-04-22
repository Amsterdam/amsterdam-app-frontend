import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {SizeTokens} from '../../../themes/tokens'

type Props = {
  height?: keyof SizeTokens
  width?: keyof SizeTokens
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
        width: width && theme.size[width],
        height: height && theme.size[height],
      },
    })
