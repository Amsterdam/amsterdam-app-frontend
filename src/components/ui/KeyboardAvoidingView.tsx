import {useHeaderHeight} from '@react-navigation/elements'
import React from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'
import {size} from '../../tokens'

type Props = {
  children: React.ReactNode
}

export const KeyboardAvoidingView = ({children}: Props) => {
  const headerHeight = useHeaderHeight()

  const getHeaderHeight = (): number =>
    headerHeight + (StatusBar.currentHeight ?? 0)

  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={getHeaderHeight() + size.spacing.md}>
      {children}
    </RNKeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
