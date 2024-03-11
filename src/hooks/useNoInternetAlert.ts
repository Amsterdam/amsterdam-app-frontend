import NetInfo from '@react-native-community/netinfo'
import {useEffect, useState} from 'react'
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

  useEffect(() => {
    if (isAlertVisible) {
      Alert.alert(
        'Het lijkt erop dat u geen internet heeft',
        'Controleer uw internetverbinding in uw instellingen.',
        [
          {
            text: 'Instellingen',
            onPress: () => Linking.openSettings(),
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
        },
      )
    }
  }, [isAlertVisible])
}
