import {useHeaderHeight} from '@react-navigation/elements'
import {ReactNode} from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'
import {useTheme} from '@/themes'

type Props = {
  children: ReactNode
}

export const KeyboardAvoidingView = ({children}: Props) => {
  const {size} = useTheme()
  const headerHeight = useHeaderHeight()
  const getHeaderHeight = (): number =>
    headerHeight + (StatusBar.currentHeight ?? 0)

  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={getHeaderHeight() + size.spacing.md}
      style={styles.container}>
      {children}
    </RNKeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
