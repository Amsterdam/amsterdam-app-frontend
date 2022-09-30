import React, {ReactNode} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {KeyboardAvoidingView} from '@/components/ui/KeyboardAvoidingView'
import {Gutter, ScrollView} from '@/components/ui/layout'

type WrapperProps = Pick<Props, 'children' | 'keyboardAware' | 'scroll'> & {
  keyboardAwareScrollViewStyle: StyleProp<ViewStyle>
}

const Wrapper = ({
  children,
  keyboardAware = false,
  keyboardAwareScrollViewStyle,
  scroll = true,
}: WrapperProps) => {
  if (scroll) {
    if (keyboardAware) {
      return (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={keyboardAwareScrollViewStyle}>
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

type WithInsetProps = {
  withBottomInset?: boolean
  withLeftInset?: boolean
  withRightInset?: boolean
  withTopInset?: boolean
}

type Props = {
  children: ReactNode
  keyboardAware?: boolean
  scroll?: boolean
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
} & WithInsetProps

export const Screen = ({
  children,
  stickyFooter,
  stickyHeader,
  withBottomInset = true,
  withLeftInset = true,
  withRightInset = true,
  withTopInset = false,
  ...wrapperProps
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    hasStickyFooter: !!stickyFooter,
    hasStickyHeader: !!stickyHeader,
    withBottomInset,
    withLeftInset,
    withRightInset,
    withTopInset,
  })

  return (
    <View style={styles.screen}>
      {stickyHeader}
      <Wrapper
        keyboardAwareScrollViewStyle={styles.keyboardAwareScrollView}
        {...wrapperProps}>
        <View style={styles.content}>{children}</View>
      </Wrapper>
      {!!stickyFooter && (
        <>
          <Gutter height="sm" />
          {stickyFooter}
        </>
      )}
    </View>
  )
}

const createStyles = (
  {bottom, left, right, top}: EdgeInsets,
  {
    hasStickyFooter,
    hasStickyHeader,
    withBottomInset,
    withLeftInset,
    withRightInset,
    withTopInset,
  }: {
    hasStickyFooter: boolean
    hasStickyHeader: boolean
  } & WithInsetProps,
) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: withLeftInset ? left : 0,
      paddingRight: withRightInset ? right : 0,
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
