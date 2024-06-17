import {ReactNode} from 'react'
import {StyleProp, ViewStyle, View} from 'react-native'
import {HideFromAccessibilityWithBottomSheetOpen} from '@/components/ui/containers/HideFromAccessibilityWithBottomSheetOpen'

type ScreenInnerWrapperProps = {
  children: ReactNode
  hasBottomsheet: boolean
  style: StyleProp<ViewStyle>
}

export const ScreenInnerWrapper = ({
  hasBottomsheet,
  children,
  style,
}: ScreenInnerWrapperProps) =>
  hasBottomsheet ? (
    <HideFromAccessibilityWithBottomSheetOpen style={style}>
      {children}
    </HideFromAccessibilityWithBottomSheetOpen>
  ) : (
    <View style={style}>{children}</View>
  )
