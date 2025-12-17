import {useEffect} from 'react'
import {Alert} from 'react-native'
import type {StackNavigationProp} from '@/app/navigation/types'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'

export const useAlertBeforeNavigation = (
  navigation: StackNavigationProp<ReportProblemRouteName.reportProblemWebView>,
  onHandleBackPress: () => boolean,
  isInProgress: boolean,
) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (isInProgress) {
          // Prevent default behavior of leaving the screen
          e.preventDefault()

          // Prompt the user before leaving the screen
          if (!onHandleBackPress()) {
            Alert.alert(
              'Weet u zeker dat u het formulier wilt verlaten?',
              'Als u deze pagina verlaat, dan worden uw ingevulde antwoorden verwijderd.',
              [
                {text: 'Annuleren', style: 'cancel', onPress: () => null},
                {
                  text: 'Verlaat en verwijder antwoorden',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ],
              {cancelable: true},
            )
          }
        }
      }),
    [isInProgress, navigation, onHandleBackPress],
  )
}
