import {useFocusEffect} from '@react-navigation/core'
import {Platform, StatusBar} from 'react-native'
import {lightColorTokens} from '@/themes/tokens'

export const useTransparentStatusBar = () => {
  useFocusEffect(() => {
    if (Platform.OS !== 'android') {
      return
    }
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')

    return () => {
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor(lightColorTokens.screen.background.default)
    }
  })
}
