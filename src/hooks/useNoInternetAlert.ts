import NetInfo from '@react-native-community/netinfo'
import {useCallback, useEffect, useState} from 'react'
import {Alert, Linking} from 'react-native'

export const useNoInternetAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean | null>()

  useEffect(
    () =>
      NetInfo.addEventListener(({isInternetReachable}) => {
        if (isInternetReachable === false && !isAlertVisible) {
          setIsAlertVisible(true)
        }
      }),
    [isAlertVisible],
  )

  const openSettings = useCallback(() => {
    setIsAlertVisible(false)
    void Linking.openSettings()
  }, [])

  useEffect(() => {
    if (isAlertVisible) {
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
            onPress: () => setIsAlertVisible(false),
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => setIsAlertVisible(false),
        },
      )
    }
  }, [isAlertVisible, openSettings])
}
