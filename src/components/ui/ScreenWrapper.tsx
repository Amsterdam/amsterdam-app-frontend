import React from 'react'
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native'
import {color} from '../../tokens'

type Props = {
  children: React.ReactNode
}

export const ScreenWrapper = ({children}: Props) => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyles = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  return (
    <SafeAreaView style={[backgroundStyles, {...styles.container}]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
})
