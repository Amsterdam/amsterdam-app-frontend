import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {EdgeInsets} from 'react-native-safe-area-context/src/SafeArea.types'

type Props = {
  children: ReactNode
  withoutNavigationHeader?: boolean
}

export const Screen = ({children, withoutNavigationHeader = false}: Props) => {
  const {top, ...otherInsets} = useSafeAreaInsets()
  const styles = createStyles({
    ...otherInsets,
    top: withoutNavigationHeader ? top : 0,
  })

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (insets: Partial<EdgeInsets>) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: insets.top,
    },
  })
