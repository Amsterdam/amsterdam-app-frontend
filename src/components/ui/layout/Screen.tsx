import React, {ReactNode} from 'react'
import {StyleSheet, Text, View} from 'react-native'
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
      <Text>Hello</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({view: {flex: 1, backgroundColor: '#f00'}})
