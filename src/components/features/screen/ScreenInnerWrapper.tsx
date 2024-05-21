import {ReactNode, FC} from 'react'
import {StyleProp, ViewStyle, View} from 'react-native'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'

type ScreenInnerWrapperProps = {
  children: ReactNode
  hasBottomsheet: boolean
  style: StyleProp<ViewStyle>
}

export const ScreenInnerWrapper: FC<ScreenInnerWrapperProps> = ({
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
