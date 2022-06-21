import {useHeaderHeight} from '@react-navigation/elements'
import React, {ReactNode} from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'
import {useSelector} from 'react-redux'
import {selectTheme} from '@/themes'

type Props = {
  children: ReactNode
}

export const KeyboardAvoidingView = ({children}: Props) => {
  const {
    theme: {size},
  } = useSelector(selectTheme)

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
