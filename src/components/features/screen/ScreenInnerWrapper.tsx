import {ReactNode} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'

type ScreenInnerWrapperProps = {
  children: ReactNode
  style: StyleProp<ViewStyle>
}

export const ScreenInnerWrapper = ({
  children,
  style,
}: ScreenInnerWrapperProps) => <View style={style}>{children}</View>
