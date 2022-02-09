import React, {ReactNode} from 'react'
import {ScrollView as RNScrollView, StyleSheet} from 'react-native'

type Props = {
  children: ReactNode
  grow?: boolean
}

export const ScrollView = ({children, grow}: Props) => {
  return (
    <RNScrollView
      contentContainerStyle={grow && styles.container}
      keyboardShouldPersistTaps={grow && 'handled'}>
      {children}
    </RNScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})
