import {useNetInfo} from '@react-native-community/netinfo'
import {useEffect} from 'react'
import {Alert, Linking} from 'react-native'

export const useNoInternetAlert = () => {
  const netInfo = useNetInfo()

  useEffect(() => {
    if (netInfo.isConnected === false) {
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
            style: 'default',
          },
        ],
        {
          cancelable: true,
        },
      )
    }
  }, [netInfo.isConnected])
}
