import React, {useContext} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {DeviceContext} from '../../../providers'
import {Theme, useThemable} from '@/themes'

type Props = ViewProps

export const GridCell = ({children}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const styles = useThemable(createStyles(!!isLandscape))

  return <View style={styles.gridCell}>{children}</View>
}

const createStyles =
  (isLandscape: boolean) =>
  ({size}: Theme) =>
    StyleSheet.create({
      gridCell: {
        width: isLandscape ? '50%' : undefined,
        paddingRight: isLandscape ? size.spacing.sm : undefined,
        paddingBottom: size.spacing.sm,
      },
    })
