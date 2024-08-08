import {ReactNode, forwardRef} from 'react'
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {layoutStyles} from '@/styles/layoutStyles'

export type ScrollViewProps = {
  children: ReactNode
  grow?: boolean
  withBottomInset?: boolean
} & RNScrollViewProps

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  ({children, grow, withBottomInset = false, ...scrollViewProps}, ref) => {
    const insets = useSafeAreaInsets()

    return (
      <RNScrollView
        contentContainerStyle={!!grow && layoutStyles.grow}
        keyboardShouldPersistTaps={grow ? 'handled' : undefined}
        ref={ref}
        scrollIndicatorInsets={{right: Number.MIN_VALUE}}
        style={!!withBottomInset && {paddingBottom: insets.bottom}}
        {...scrollViewProps}>
        {children}
      </RNScrollView>
    )
  },
)
