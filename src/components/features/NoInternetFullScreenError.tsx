import {useFocusEffect} from '@react-navigation/core'
import {useCallback, useEffect} from 'react'
import {Platform, Linking} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {NoInternetFigure} from '@/components/ui/media/errors/NoInternetFigure'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {setIsNoInternetFullScreenErrorVisible} from '@/store/slices/internetConnection'

export const NoInternetErrorFullScreen = () => {
  const {isPortrait} = useDeviceContext()
  const dispatch = useDispatch()

  const effect = useCallback(() => {
    dispatch(setIsNoInternetFullScreenErrorVisible(true))

    return () => {
      dispatch(setIsNoInternetFullScreenErrorVisible(false))
    }
  }, [dispatch])

  useEffect(effect, [effect])

  useFocusEffect(effect)

  return (
    <Screen
      testID="HomeErrorScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <FullScreenError
        buttonAccessibilityLabel="Laad de modules opnieuw"
        buttonLabel="Naar instellingen"
        Image={NoInternetFigure}
        onPress={() => {
          if (Platform.OS === 'ios') {
            void Linking.openURL('App-Prefs:root')
          } else {
            void Linking.sendIntent('android.settings.SETTINGS')
          }
        }}
        testID="HomeErrorScreen"
        text="Controleer de internetverbinding in uw instellingen."
        title="Geen internetverbinding"
      />
    </Screen>
  )
}
