import {FC, ReactNode, useCallback, useMemo} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {KeyboardAvoidingView} from '@/components/ui/containers/KeyboardAvoidingView'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {TestProps} from '@/components/ui/types'

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
  bottomSheet?: ReactNode
  children: ReactNode
  keyboardAware?: boolean
  scroll?: boolean
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
} & TestProps &
  WithInsetProps

export const Screen = ({
  bottomSheet,
  children,
  stickyFooter,
  stickyHeader,
  withBottomInset = true,
  withLeftInset = true,
  withRightInset = true,
  withTopInset = false,
  testID,
  ...wrapperProps
}: Props) => {
  const insets = useSafeAreaInsets()

  const styles = useMemo(
    () =>
      createStyles(insets, {
        hasStickyFooter: !!stickyFooter,
        hasStickyHeader: !!stickyHeader,
        withBottomInset,
        withLeftInset,
        withRightInset,
        withTopInset,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const InnerWrapper: FC<{children: ReactNode}> = useCallback(
    props =>
      bottomSheet ? (
        <HideFromAccessibility
          {...props}
          style={styles.content}
          whileBottomSheetIsOpen
        />
      ) : (
        <View
          style={styles.content}
          {...props}
        />
      ),
    [bottomSheet, styles.content],
  )

  return (
    <View
      style={styles.screen}
      testID={testID}>
      {stickyHeader}
      <Wrapper
        keyboardAwareScrollViewStyle={styles.keyboardAwareScrollView}
        {...wrapperProps}>
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
      {(!!stickyFooter || !!bottomSheet) && (
        <>
          <Gutter height="sm" />
          {stickyFooter}
          {bottomSheet}
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
) =>
  StyleSheet.create({
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
