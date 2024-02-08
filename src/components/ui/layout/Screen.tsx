import {type FC, type MutableRefObject, type ReactNode, useMemo} from 'react'
import {type StyleProp, StyleSheet, View, type ViewStyle} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {selectSeenTips} from '@/components/features/product-tour/slice'
import {type Tip} from '@/components/features/product-tour/types'
import {
  KeyboardAwareTrackScrollView,
  TrackScrollView,
} from '@/components/features/product-tour/withTrackScroll'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {KeyboardAvoidingView} from '@/components/ui/containers/KeyboardAvoidingView'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {type TestProps} from '@/components/ui/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsScreenScrollDisabled} from '@/hooks/useScreenScrollDisable'
import {useTrackScreenOnFocus} from '@/processes/piwik/hooks/useTrackScreenOnFocus'
import {
  type ScreenOutsideNavigationName,
  useTrackScreenOutsideNavigation,
} from '@/processes/piwik/hooks/useTrackScreenOutsideNavigation'
import {DisableScrollProvider} from '@/providers/disableScroll.provider'

type WrapperProps = Pick<
  Props,
  'children' | 'keyboardAware' | 'scroll' | 'trackScroll'
> & {
  keyboardAwareScrollViewStyle: StyleProp<ViewStyle>
} & {elementRef?: MutableRefObject<View | null>}

const ScrollableWrapper = ({
  children,
  keyboardAware,
  keyboardAwareScrollViewStyle,
  trackScroll,
}: WrapperProps) => {
  const seenTips = useSelector(selectSeenTips)
  const hasUnseenTips =
    trackScroll && trackScroll.some(t => seenTips.includes(t))

  if (keyboardAware) {
    const CustomKeyboardAwareScrollView = hasUnseenTips
      ? KeyboardAwareTrackScrollView
      : KeyboardAwareScrollView

    return (
      <CustomKeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={keyboardAwareScrollViewStyle}>
        {children}
      </CustomKeyboardAwareScrollView>
    )
  }

  const CustomScrollView = hasUnseenTips ? TrackScrollView : ScrollView

  return <CustomScrollView grow>{children}</CustomScrollView>
}

const Wrapper = ({
  children,
  keyboardAware = false,
  keyboardAwareScrollViewStyle,
  scroll = true,
  trackScroll,
}: WrapperProps) => {
  const isScrollDisabled = useIsScreenScrollDisabled()

  if (scroll && !isScrollDisabled) {
    return (
      <ScrollableWrapper
        keyboardAware={keyboardAware}
        keyboardAwareScrollViewStyle={keyboardAwareScrollViewStyle}
        trackScroll={trackScroll}>
        {children}
      </ScrollableWrapper>
    )
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
  /**
   * Include all product-tour tips on the screen to determine if the scroll should be tracked
   */
  trackScroll?: Tip[]
} & TestProps &
  WithInsetProps

type InnerWrapperProps = {
  children: ReactNode
  hasBottomsheet: boolean
  style: StyleProp<ViewStyle>
}

const InnerWrapper: FC<InnerWrapperProps> = ({
  hasBottomsheet,
  style,
  ...props
}) =>
  hasBottomsheet ? (
    <HideFromAccessibility
      {...props}
      style={style}
      whileBottomSheetIsOpen
    />
  ) : (
    <View
      style={style}
      {...props}
    />
  )

export const ScreenBase = ({
  bottomSheet,
  children,
  stickyFooter,
  stickyHeader,
  withBottomInset = true,
  withLeftInset = true,
  withRightInset = true,
  withTopInset = false,
  testID,
  trackScroll,
  ...wrapperProps
}: Props) => {
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
        <Wrapper
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
    },
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: withLeftInset ? left : 0,
      paddingRight: withRightInset ? right : 0,
      paddingTop: withTopInset && hasStickyHeader ? top : 0,
    },
  })

type ScreenOutsideNavigationProps = Props & {
  name: ScreenOutsideNavigationName
}

export const ScreenOutsideNavigation = ({
  name,
  ...screenProps
}: ScreenOutsideNavigationProps) => {
  useTrackScreenOutsideNavigation(name)

  return <ScreenBase {...screenProps} />
}

export const Screen = (props: Props) => {
  useTrackScreenOnFocus()

  return <ScreenBase {...props} />
}
