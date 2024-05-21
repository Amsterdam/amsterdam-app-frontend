import {MutableRefObject} from 'react'
import {StyleProp, ViewStyle, View, KeyboardAvoidingView} from 'react-native'
import {ScreenProps} from '@/components/features/screen/Screen'
import {ScreenScrollableWrapper} from '@/components/features/screen/ScreenScrollableWrapper'
import {useIsScreenScrollDisabled} from '@/hooks/useScreenScrollDisable'

export type ScreenWrapperProps = Pick<
  ScreenProps,
  'children' | 'keyboardAware' | 'scroll' | 'trackScroll'
> & {
  keyboardAwareScrollViewContentStyle: StyleProp<ViewStyle>
  keyboardAwareScrollViewStyle: StyleProp<ViewStyle>
} & {elementRef?: MutableRefObject<View | null>}

export const ScreenWrapper = ({
  children,
  keyboardAware = false,
  keyboardAwareScrollViewStyle,
  keyboardAwareScrollViewContentStyle,
  scroll = true,
  trackScroll,
}: ScreenWrapperProps) => {
  const isScrollDisabled = useIsScreenScrollDisabled()

  if (scroll && !isScrollDisabled) {
    return (
      <ScreenScrollableWrapper
        keyboardAware={keyboardAware}
        keyboardAwareScrollViewContentStyle={
          keyboardAwareScrollViewContentStyle
        }
        keyboardAwareScrollViewStyle={keyboardAwareScrollViewStyle}
        trackScroll={trackScroll}>
        {children}
      </ScreenScrollableWrapper>
    )
  }

  if (keyboardAware) {
    return <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
  }

  return <>{children}</>
}
