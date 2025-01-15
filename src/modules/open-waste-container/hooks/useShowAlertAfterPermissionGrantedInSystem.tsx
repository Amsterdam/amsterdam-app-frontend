import {useState} from 'react'
import {check} from 'react-native-permissions'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {alerts} from '@/modules/open-waste-container/alerts'
import {useAlert} from '@/store/slices/alert'
import {Permissions} from '@/types/permissions'

export const useShowAlertAfterPermissionGrantedInSystem = () => {
  const [isAddWasteCardButtonPressed, setIsAddWasteCardButtonPressed] =
    useState(false)
  const [isAlertShown, setIsAlertShown] = useState(false)
  const {setAlert} = useAlert()

  useFocusAndForegroundEffect(() => {
    void check(Permissions.bluetooth).then(result => {
      if (result !== 'granted') {
        return
      }

      if (isAddWasteCardButtonPressed && !isAlertShown) {
        setAlert(alerts.bluetoothPermissionSuccess)
        setIsAlertShown(true)
      }
    })
  }, [isAddWasteCardButtonPressed, isAlertShown])

  return {setIsAddWasteCardButtonPressed}
}
