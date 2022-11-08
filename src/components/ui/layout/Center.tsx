import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {layoutStyles} from '@/styles'

type Props = {
  children: ReactNode
  grow?: boolean
}

export const Center = ({children, grow}: Props) => (
  <View style={[styles.center, grow && layoutStyles.grow]}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
