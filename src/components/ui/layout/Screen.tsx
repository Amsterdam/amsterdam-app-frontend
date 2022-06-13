import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  withoutNavigationHeader?: boolean
}

export const Screen = ({children, withoutNavigationHeader = false}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, withoutNavigationHeader)

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (
  insets: Partial<EdgeInsets>,
  withoutNavigationHeader: boolean,
) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: withoutNavigationHeader ? insets.top : 0,
    },
  })
