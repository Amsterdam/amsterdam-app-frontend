import React, {ReactNode} from 'react'
import {ScrollView as RNScrollView, StyleSheet} from 'react-native'

type Props = {
  children: ReactNode
  fullScreen?: boolean
}

export const ScrollView = ({children, fullScreen}: Props) => {
  return (
    <RNScrollView
      contentContainerStyle={fullScreen && styles.container}
      keyboardShouldPersistTaps={fullScreen && 'handled'}>
      {children}
    </RNScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})
