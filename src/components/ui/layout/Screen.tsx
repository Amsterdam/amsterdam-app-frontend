import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  safeBottomInset?: boolean
  safeTopInset?: boolean
}

export const Screen = ({
  children,
  safeTopInset = true,
  safeBottomInset = false,
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    safeBottomInset: safeBottomInset,
    safeTopInset: safeTopInset,
  })

  return <View style={styles.screen}>{children}</View>
}

const createStyles = (
  insets: Partial<EdgeInsets>,
  {safeBottomInset, safeTopInset}: Partial<Props>,
) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: safeBottomInset ? insets.bottom : 0,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: safeTopInset ? insets.top : 0,
    },
  })
