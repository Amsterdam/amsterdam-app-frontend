import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  handleTopNotch?: boolean
}

export const Screen = ({children, handleTopNotch = false}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, handleTopNotch)

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (insets: Partial<EdgeInsets>, handleTopNotch: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: handleTopNotch ? insets.top : 0,
    },
  })
