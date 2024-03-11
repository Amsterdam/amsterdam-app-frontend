import NetInfo from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {Alert, Linking} from 'react-native'
import {hasSnoozeTimeInSecondsPassed} from '@/utils/hasSnoozeTimePassed'

export const useNoInternetAlert = () =>
  useEffect(() => {
    let isAlertVisible = false
    let dismissedTime: number | null = null
    const dismissAlert = () => {
      isAlertVisible = false
      dismissedTime = Date.now()
    }
    const openSettings = () => {
      dismissAlert()
      void Linking.openSettings()
    }

    return NetInfo.addEventListener(({isInternetReachable}) => {
      if (
        isInternetReachable === false &&
        !isAlertVisible &&
        hasSnoozeTimeInSecondsPassed(10, dismissedTime)
      ) {
        isAlertVisible = true
        Alert.alert(
          'Het lijkt erop dat u geen internet heeft',
          'Controleer uw internetverbinding in uw instellingen.',
          [
            {
              text: 'Instellingen',
              onPress: openSettings,
              style: 'default',
            },
            {
              text: 'Annuleer',
              onPress: dismissAlert,
              style: 'default',
            },
          ],
          {
            cancelable: true,
            onDismiss: dismissAlert,
          },
        )
      }
    })
  }, [])
