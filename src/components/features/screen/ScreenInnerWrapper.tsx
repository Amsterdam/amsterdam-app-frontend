import {ReactNode} from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import {HideFromAccessibilityWhenInBackground} from '@/components/features/accessibility/HideBackgroundFromAccessibility'

type ScreenInnerWrapperProps = {
  children: ReactNode
  style: StyleProp<ViewStyle>
}

export const ScreenInnerWrapper = ({
  children,
  style,
}: ScreenInnerWrapperProps) => (
  <HideFromAccessibilityWhenInBackground style={style}>
    {children}
  </HideFromAccessibilityWhenInBackground>
)
