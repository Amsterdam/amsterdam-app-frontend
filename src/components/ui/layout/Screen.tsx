import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  safeTopInset?: boolean
}

export const Screen = ({children, safeTopInset = true}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    safeTopInset: safeTopInset,
  })

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (
  insets: Partial<EdgeInsets>,
  {safeTopInset}: Partial<Props>,
) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: safeTopInset ? insets.top : 0,
    },
  })
