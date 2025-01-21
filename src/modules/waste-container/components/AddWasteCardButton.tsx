import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestBluetoothPermission} from '@/modules/waste-container/hooks/useRequestBluetoothPermission'
import {WasteContainerModalName} from '@/modules/waste-container/routes'
import {Permissions} from '@/types/permissions'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()
  const requestBluetoothPermission = useRequestBluetoothPermission()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.bluetooth,
  )

  const onPressButton = useCallback(() => {
    void requestBluetoothPermission().then(hasBTPermission => {
      if (hasBTPermission) {
        // TODO: store waste card in secure storage once endpoint is implemented
        navigate(WasteContainerModalName.addWasteCardSuccess)
      } else {
        navigateToInstructionsScreen() // Permissions on Android don't have a 'blocked' status
      }
    })
  }, [navigate, navigateToInstructionsScreen, requestBluetoothPermission])

  return (
    <Button
      label="Afvalpas toevoegen"
      onPress={onPressButton}
      testID="AddWasteCardScreenButton"
    />
  )
}
