import {useRoute} from '@react-navigation/native'
import React from 'react'
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native'
import {routes} from '../../../App'
import {color} from '../../tokens'
import {Header} from './'

type ScreenWrapperProps = {
  children: React.ReactNode
}

export const ScreenWrapper = ({children}: ScreenWrapperProps) => {
  const route = useRoute()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyles = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  return (
    <SafeAreaView style={[backgroundStyles, {...styles.container}]}>
      {route.name === routes.home.name && <Header />}
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
