import {MutableRefObject} from 'react'
import {StyleProp, ViewStyle, View} from 'react-native'
import {KeyboardAvoidingView} from 'react-native-keyboard-controller'
import {ScreenProps} from '@/components/features/screen/Screen'
import {ScreenScrollableWrapper} from '@/components/features/screen/ScreenScrollableWrapper'
import {useIsScreenScrollDisabled} from '@/hooks/useScreenScrollDisable'

export type ScreenWrapperProps = Pick<
  ScreenProps,
  'children' | 'keyboardAware' | 'scroll' | 'trackScroll'
> & {
  scrollViewContentStyle: StyleProp<ViewStyle>
  scrollViewStyle: StyleProp<ViewStyle>
} & {elementRef?: MutableRefObject<View | null>}

export const ScreenWrapper = ({
  children,
  keyboardAware = false,
  scrollViewStyle,
  scrollViewContentStyle,
  scroll = true,
  trackScroll,
}: ScreenWrapperProps) => {
  const isScrollDisabled = useIsScreenScrollDisabled()

  if (scroll && !isScrollDisabled) {
    return (
      <ScreenScrollableWrapper
        keyboardAware={keyboardAware}
        scrollViewContentStyle={scrollViewContentStyle}
        scrollViewStyle={scrollViewStyle}
        trackScroll={trackScroll}>
        {children}
      </ScreenScrollableWrapper>
    )
  }

  if (keyboardAware) {
    return (
      <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
    )
  }

  return <>{children}</>
}
