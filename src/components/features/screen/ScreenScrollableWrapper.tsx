import {ScrollView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {selectSeenTips} from '@/components/features/product-tour/slice'
import {
  KeyboardAwareTrackScrollView,
  TrackScrollView,
} from '@/components/features/product-tour/withTrackScroll'
import {ScreenWrapperProps} from '@/components/features/screen/ScreenWrapper'
import {useSelector} from '@/hooks/redux/useSelector'

export const ScreenScrollableWrapper = ({
  children,
  keyboardAware,
  scrollViewStyle,
  scrollViewContentStyle,
  trackScroll,
}: ScreenWrapperProps) => {
  const seenTips = useSelector(selectSeenTips)
  const hasUnseenTips = trackScroll?.some(t => seenTips.includes(t))

  if (keyboardAware) {
    const CustomKeyboardAwareScrollView = hasUnseenTips
      ? KeyboardAwareTrackScrollView
      : KeyboardAwareScrollView

    return (
      <CustomKeyboardAwareScrollView
        contentContainerStyle={scrollViewContentStyle}
        keyboardShouldPersistTaps="handled"
        style={scrollViewStyle}>
        {children}
      </CustomKeyboardAwareScrollView>
    )
  }

  const CustomScrollView = hasUnseenTips ? TrackScrollView : ScrollView

  return (
    <CustomScrollView
      contentContainerStyle={scrollViewContentStyle}
      keyboardShouldPersistTaps="handled"
      style={scrollViewStyle}>
      {children}
    </CustomScrollView>
  )
}
