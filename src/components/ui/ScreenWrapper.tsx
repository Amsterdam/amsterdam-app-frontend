import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'

type Props = {
  children: React.ReactNode
}

export const ScreenWrapper = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
