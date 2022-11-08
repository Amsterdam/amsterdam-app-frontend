import React, {useContext} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {DeviceContext} from '@/providers'

type Props = ViewProps

export const Grid = ({children}: Props) => {
  const {isLandscape} = useContext(DeviceContext)

  return <View style={!!isLandscape && styles.grid}>{children}</View>
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
