import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  withoutNavigationHeader?: boolean
}

export const Screen = ({children, withoutNavigationHeader = false}: Props) => {
  const {bottom, left, right, top} = useSafeAreaInsets()
  return (
    <View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingBottom: bottom ?? 0,
          paddingLeft: left ?? 0,
          paddingRight: right ?? 0,
          paddingTop: withoutNavigationHeader ? top ?? 0 : 0,
        },
        styles.view,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({view: {flex: 1}})
