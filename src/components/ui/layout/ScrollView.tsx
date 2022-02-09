import React, {ReactNode} from 'react'
import {ScrollView as RNScrollView} from 'react-native'
import {layoutStyles} from '../../../styles'

type Props = {
  children: ReactNode
  grow?: boolean
}

export const ScrollView = ({children, grow}: Props) => {
  return (
    <RNScrollView
      contentContainerStyle={grow && layoutStyles.grow}
      keyboardShouldPersistTaps={grow && 'handled'}>
      {children}
    </RNScrollView>
  )
}
