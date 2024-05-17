import {ScrollView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {selectSeenTips} from '@/components/features/product-tour/slice'
import {
  KeyboardAwareTrackScrollView,
  TrackScrollView,
} from '@/components/features/product-tour/withTrackScroll'
import {WrapperProps} from '@/components/features/screen/Wrapper'
import {useSelector} from '@/hooks/redux/useSelector'

export const ScrollableWrapper = ({
  children,
  keyboardAware,
  keyboardAwareScrollViewStyle,
  keyboardAwareScrollViewContentStyle,
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
        contentContainerStyle={keyboardAwareScrollViewContentStyle}
        keyboardShouldPersistTaps="handled"
        style={keyboardAwareScrollViewStyle}>
        {children}
      </CustomKeyboardAwareScrollView>
    )
  }

  const CustomScrollView = hasUnseenTips ? TrackScrollView : ScrollView

  return <CustomScrollView grow>{children}</CustomScrollView>
}
