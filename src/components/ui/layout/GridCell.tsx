import React, {useContext} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {DeviceContext} from '../../../providers'
import {size} from '../../../tokens'

type Props = ViewProps

export const GridCell = ({children}: Props) => {
  const {isLandscape} = useContext(DeviceContext)

  return (
    <View style={[isLandscape && styles.cell, styles.verticalGutter]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: '50%',
    paddingRight: size.spacing.sm,
  },
  verticalGutter: {
    paddingBottom: size.spacing.sm,
  },
})
