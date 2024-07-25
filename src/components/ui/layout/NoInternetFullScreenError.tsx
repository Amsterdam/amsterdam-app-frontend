import {Platform, Linking} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {NoInternetFigure} from '@/components/ui/media/errors/NoInternetFigure'
import {useDeviceContext} from '@/hooks/useDeviceContext'

export const NoInternetErrorFullScreen = () => {
  const {isPortrait} = useDeviceContext()

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
            void Linking.openURL('App-Prefs')
          } else {
            void Linking.sendIntent('android.settings.SETTINGS')
          }
        }}
        testProps={{
          testID: 'HomeErrorScreen',
        }}
        text="Controleer de internetverbinding in uw instellingen."
        title="Geen internetverbinding"
      />
    </Screen>
  )
}
