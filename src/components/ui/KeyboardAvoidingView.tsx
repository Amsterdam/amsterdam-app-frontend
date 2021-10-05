import {useHeaderHeight} from '@react-navigation/elements'
import React from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'
import {size} from '../../tokens'

export const KeyboardAvoidingView = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const headerHeight = useHeaderHeight()

  const getHeaderHeight = (): number => {
    return StatusBar.currentHeight
      ? headerHeight + StatusBar.currentHeight
      : headerHeight
  }
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
  container: {flex: 1},
})
