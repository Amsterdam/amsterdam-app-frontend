import React from 'react'
import {SafeAreaView, useColorScheme} from 'react-native'
import {color} from '../../tokens'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

export const WrapScreen = ({children}: Props) => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header />
      {children}
    </SafeAreaView>
  )
}
