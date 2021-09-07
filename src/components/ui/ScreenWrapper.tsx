import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {color} from '../../tokens'

type Props = {
  background?: 'emphasis' | 'invalid' | 'light' | 'lighter'
  children: React.ReactNode
}

export const ScreenWrapper = ({background, children}: Props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background && color.background[background],
    },
  })
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}
