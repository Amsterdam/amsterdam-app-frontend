import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
}

export const Screen = ({children}: Props) => {
  const {bottom, left, right} = useSafeAreaInsets()
  return (
    <View
      style={[
        {
          paddingBottom: bottom ?? 0,
          paddingLeft: left ?? 0,
          paddingRight: right ?? 0,
        },
        styles.view,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({view: {flex: 1}})
