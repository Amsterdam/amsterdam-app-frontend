import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {KeyboardAvoidingView} from '@/components/ui/KeyboardAvoidingView'
import {ScrollView} from '@/components/ui/layout'

const getWrapper = (scroll: boolean, keyboardAware: boolean) => {
  if (scroll) {
    if (keyboardAware) {
      return KeyboardAwareScrollView
    }
    return ScrollView
  }
  if (keyboardAware) {
    return KeyboardAvoidingView
  }
  return
}

type Props = {
  children: ReactNode
  keyboardAware?: boolean
  scroll?: boolean
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
  withBottomInset?: boolean
  withTopInset?: boolean
}

export const Screen = ({
  children,
  keyboardAware = false,
  scroll = false,
  stickyFooter,
  stickyHeader,
  withTopInset = false,
  withBottomInset = true,
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    withTopInset,
    withBottomInset,
    hasStickyFooter: !!stickyFooter,
    hasStickyHeader: !!stickyHeader,
  })

  const Wrapper = getWrapper(scroll, keyboardAware)
  const content = <View style={styles.content}>{children}</View>

  return (
    <View style={styles.screen}>
      {stickyHeader}
      {Wrapper ? <Wrapper style={styles.wrapper}>{content}</Wrapper> : content}
      {stickyFooter}
    </View>
  )
}

const createStyles = (
  {bottom, left, right, top}: EdgeInsets,
  {
    withBottomInset,
    withTopInset,
    hasStickyFooter,
    hasStickyHeader,
  }: Pick<Props, 'withTopInset' | 'withBottomInset'> & {
    hasStickyFooter: boolean
    hasStickyHeader: boolean
  },
) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: withTopInset && hasStickyHeader ? top : 0,
    },
    wrapper: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingBottom: withBottomInset && !hasStickyFooter ? bottom : 0,
      paddingTop: withTopInset && !hasStickyHeader ? top : 0,
    },
  })
}
