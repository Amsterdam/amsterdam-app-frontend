import {ReactNode} from 'react'
import {ScrollView as RNScrollView, ScrollViewProps} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {layoutStyles} from '@/styles/layoutStyles'

type Props = {
  children: ReactNode
  grow?: boolean
  withBottomInset?: boolean
} & ScrollViewProps

export const ScrollView = ({
  children,
  grow,
  withBottomInset = false,
  ...scrollViewProps
}: Props) => {
  const insets = useSafeAreaInsets()

  return (
    <RNScrollView
      contentContainerStyle={!!grow && layoutStyles.grow}
      keyboardShouldPersistTaps={grow ? 'handled' : 'never'}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      style={[withBottomInset && {paddingBottom: insets.bottom}]}
      {...scrollViewProps}>
      {children}
    </RNScrollView>
  )
}
