import React from 'react'
import {ScrollView as RNScrollView, StyleSheet} from 'react-native'

type Props = {
  children: React.ReactNode
  keyboardDismiss?: boolean
}

export const ScrollView = ({children, keyboardDismiss}: Props) => {
  return (
    <RNScrollView
      contentContainerStyle={keyboardDismiss && styles.container}
      keyboardShouldPersistTaps={keyboardDismiss && 'handled'}>
      {children}
    </RNScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})
