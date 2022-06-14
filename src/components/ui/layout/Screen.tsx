import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
}

export const Screen = ({children}: Props) => {
  const {bottom = 0, left = 0, right = 0} = useSafeAreaInsets()
  const styles = createStyles({bottom, left, right})

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (insets: Partial<EdgeInsets>) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  })
