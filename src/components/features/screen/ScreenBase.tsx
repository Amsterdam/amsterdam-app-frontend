import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {InnerWrapper} from '@/components/features/screen/InnerWrapper'
import {ScreenProps, WithInsetProps} from '@/components/features/screen/Screen'
import {Wrapper} from '@/components/features/screen/Wrapper'
import {AlertTopOfScreen} from '@/components/ui/feedback/alert/AlertTopOfScreen'
import {Gutter} from '@/components/ui/layout/Gutter'
import {DisableScrollProvider} from '@/providers/disableScroll.provider'

export const ScreenBase = ({
  bottomSheet,
  children,
  hasStickyAlert,
  stickyFooter,
  stickyHeader,
  withBottomInset = true,
  withLeftInset = true,
  withRightInset = true,
  withTopInset = false,
  testID,
  trackScroll,
  ...wrapperProps
}: ScreenProps) => {
  const insets = useSafeAreaInsets()

  const hasStickyFooter = !!stickyFooter
  const hasStickyHeader = !!stickyHeader

  const styles = useMemo(
    () =>
      createStyles(insets, {
        hasStickyFooter,
        hasStickyHeader,
        withBottomInset,
        withLeftInset,
        withRightInset,
        withTopInset,
      }),
    [
      insets,
      hasStickyFooter,
      hasStickyHeader,
      withBottomInset,
      withLeftInset,
      withRightInset,
      withTopInset,
    ],
  )

  return (
    <DisableScrollProvider>
      <View
        style={styles.screen}
        testID={testID}>
        {stickyHeader}
        {!!hasStickyAlert && <AlertTopOfScreen />}
        <Wrapper
          keyboardAwareScrollViewContentStyle={
            styles.keyboardAwareScrollViewContent
          }
          keyboardAwareScrollViewStyle={styles.keyboardAwareScrollView}
          trackScroll={trackScroll}
          {...wrapperProps}>
          <InnerWrapper
            hasBottomsheet={!!bottomSheet}
            style={styles.content}>
            {children}
          </InnerWrapper>
        </Wrapper>
        {(!!stickyFooter || !!bottomSheet) && (
          <>
            <Gutter height="sm" />
            {stickyFooter}
            {bottomSheet}
          </>
        )}
      </View>
    </DisableScrollProvider>
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
    content: {
      flex: 1,
      paddingBottom: withBottomInset && !hasStickyFooter ? bottom : 0,
      paddingTop: withTopInset && !hasStickyHeader ? top : 0,
    },
    keyboardAwareScrollView: {
      flex: 1,
      flexGrow: 1,
    },
    keyboardAwareScrollViewContent: {
      flexGrow: 1,
    },
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: withLeftInset ? left : 0,
      paddingRight: withRightInset ? right : 0,
      paddingTop: withTopInset && hasStickyHeader ? top : 0,
    },
  })
