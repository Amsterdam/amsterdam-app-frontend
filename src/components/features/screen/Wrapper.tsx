import {MutableRefObject} from 'react'
import {StyleProp, ViewStyle, View, KeyboardAvoidingView} from 'react-native'
import {ScreenProps} from '@/components/features/screen/Screen'
import {ScrollableWrapper} from '@/components/features/screen/ScrollableWrapper'
import {useIsScreenScrollDisabled} from '@/hooks/useScreenScrollDisable'

export type WrapperProps = Pick<
  ScreenProps,
  'children' | 'keyboardAware' | 'scroll' | 'trackScroll'
> & {
  keyboardAwareScrollViewContentStyle: StyleProp<ViewStyle>
  keyboardAwareScrollViewStyle: StyleProp<ViewStyle>
} & {elementRef?: MutableRefObject<View | null>}

export const Wrapper = ({
  children,
  keyboardAware = false,
  keyboardAwareScrollViewStyle,
  keyboardAwareScrollViewContentStyle,
  scroll = true,
  trackScroll,
}: WrapperProps) => {
  const isScrollDisabled = useIsScreenScrollDisabled()

  if (scroll && !isScrollDisabled) {
    return (
      <ScrollableWrapper
        keyboardAware={keyboardAware}
        keyboardAwareScrollViewContentStyle={
          keyboardAwareScrollViewContentStyle
        }
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
