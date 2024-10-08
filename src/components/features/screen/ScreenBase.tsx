import {useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {HideFromAccessibilityWhenBottomSheetIsOpen} from '@/components/features/accessibility/HideFromAccessibilityWhenBottomSheetIsOpen'
import {HideFromAccessibilityWhenOverlayIsOpen} from '@/components/features/accessibility/HideFromAccessibilityWhenOverlayIsOpen'
import {ScreenProps, WithInsetProps} from '@/components/features/screen/Screen'
import {ScreenHeader} from '@/components/features/screen/ScreenHeader'
import {ScreenInnerWrapper} from '@/components/features/screen/ScreenInnerWrapper'
import {ScreenWrapper} from '@/components/features/screen/ScreenWrapper'
import {AlertTopOfScreen} from '@/components/ui/feedback/alert/AlertTopOfScreen'
import {Gutter} from '@/components/ui/layout/Gutter'
import {DisableScrollProvider} from '@/providers/disableScroll.provider'
import {useScreen} from '@/store/slices/screen'

export const ScreenBase = ({
  bottomSheet,
  children,
  hasStickyAlert,
  isOutsideNavigation = false,
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
  const {spaceBottom} = useScreen()

  const hasStickyFooter = !!stickyFooter
  const hasStickyHeader = !!stickyHeader

  const styles = useMemo(
    () =>
      createStyles(insets, {
        spaceBottom,
        hasStickyFooter,
        hasStickyHeader,
        withBottomInset,
        withLeftInset,
        withRightInset,
        withTopInset,
      }),
    [
      spaceBottom,
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
      <HideFromAccessibilityWhenOverlayIsOpen
        style={styles.screen}
        testID={testID}>
        {!isOutsideNavigation && !!bottomSheet && <ScreenHeader />}
        {stickyHeader}
        {!!hasStickyAlert && <AlertTopOfScreen />}
        <HideFromAccessibilityWhenBottomSheetIsOpen
          style={[styles.scrollViewContent, styles.scrollView]}>
          <ScreenWrapper
            scrollViewContentStyle={styles.scrollViewContent}
            scrollViewStyle={styles.scrollView}
            trackScroll={trackScroll}
            {...wrapperProps}>
            <ScreenInnerWrapper style={styles.content}>
              {children}
            </ScreenInnerWrapper>
          </ScreenWrapper>
        </HideFromAccessibilityWhenBottomSheetIsOpen>
        {(!!stickyFooter || !!bottomSheet) && (
          <>
            <Gutter height="sm" />
            {stickyFooter}
            {bottomSheet}
          </>
        )}
      </HideFromAccessibilityWhenOverlayIsOpen>
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
    spaceBottom,
  }: {
    hasStickyFooter: boolean
    hasStickyHeader: boolean
    spaceBottom: number
  } & WithInsetProps,
) =>
  StyleSheet.create({
    content: {
      flex: 1,
      paddingBottom: withBottomInset && !hasStickyFooter ? bottom : 0,
      paddingTop: withTopInset && !hasStickyHeader ? top : 0,
    },
    scrollView: {
      flex: 1,
      flexGrow: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: spaceBottom,
    },
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: withLeftInset ? left : 0,
      paddingRight: withRightInset ? right : 0,
      paddingTop: withTopInset && hasStickyHeader ? top : 0,
    },
  })
