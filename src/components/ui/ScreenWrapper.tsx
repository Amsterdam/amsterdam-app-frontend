import React from 'react'
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native'
import {color} from '../../tokens'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const ScreenWrapper = ({children}: Props) => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyles = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  return (
    <SafeAreaView style={[backgroundStyles, {...styles.container}]}>
      <Header />
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ScreenWrapper
