import React, {ReactNode} from 'react'
import {StyleSheet, StyleProp, ViewStyle, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {KeyboardAvoidingView} from '@/components/ui/KeyboardAvoidingView'
import {ScrollView} from '@/components/ui/layout'

type WrapperProps = Pick<Props, 'scroll' | 'keyboardAware' | 'children'> & {
  keyboardAwareScrollViewStyle: StyleProp<ViewStyle>
}

const Wrapper = ({
  keyboardAware = false,
  scroll = false,
  children,
  keyboardAwareScrollViewStyle,
}: WrapperProps) => {
  if (scroll) {
    if (keyboardAware) {
      return (
        <KeyboardAwareScrollView style={keyboardAwareScrollViewStyle}>
          {children}
        </KeyboardAwareScrollView>
      )
    }
    return <ScrollView grow>{children}</ScrollView>
  }
  if (keyboardAware) {
    return <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
  }
  return <>{children}</>
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
  stickyFooter,
  stickyHeader,
  withTopInset = false,
  withBottomInset = true,
  ...wrapperProps
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    withTopInset,
    withBottomInset,
    hasStickyFooter: !!stickyFooter,
    hasStickyHeader: !!stickyHeader,
  })

  return (
    <View style={styles.screen}>
      {stickyHeader}
      <Wrapper
        {...wrapperProps}
        keyboardAwareScrollViewStyle={styles.keyboardAwareScrollView}>
        <View style={styles.content}>{children}</View>
      </Wrapper>
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
    keyboardAwareScrollView: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingBottom: withBottomInset && !hasStickyFooter ? bottom : 0,
      paddingTop: withTopInset && !hasStickyHeader ? top : 0,
    },
  })
}
