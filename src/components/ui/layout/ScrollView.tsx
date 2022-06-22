import React, {ReactNode} from 'react'
import {ScrollView as RNScrollView, ScrollViewProps} from 'react-native'
import {layoutStyles} from '@/styles'

type Props = {
  children: ReactNode
  grow?: boolean
} & ScrollViewProps

export const ScrollView = ({children, grow, ...otherProps}: Props) => {
  return (
    <RNScrollView
      contentContainerStyle={grow && layoutStyles.grow}
      keyboardShouldPersistTaps={grow && 'handled'}
      {...otherProps}>
      {children}
    </RNScrollView>
  )
}
