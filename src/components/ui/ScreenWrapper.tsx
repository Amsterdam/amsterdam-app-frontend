import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {color} from '../../tokens'

type Props = {
  children: React.ReactNode
}

export const ScreenWrapper = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background.light,
    flex: 1,
  },
})
