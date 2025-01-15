import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestBluetoothPermission} from '@/modules/waste-container/hooks/useRequestBluetoothPermission'
import {OpenWasteContainerModalName} from '@/modules/waste-container/routes'
import {Permissions} from '@/types/permissions'

type Props = {
  onPress: () => void
}

export const AddWasteCardButton = ({onPress}: Props) => {
  const {navigate} = useNavigation()
  const requestBluetoothPermission = useRequestBluetoothPermission()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.bluetooth,
  )

  const onPressButton = useCallback(() => {
    onPress()
    void requestBluetoothPermission().then(hasBTPermission => {
      if (hasBTPermission) {
        // TODO: store waste card in secure storage once endpoint is implemented
        navigate(OpenWasteContainerModalName.addWasteCardSuccess)
      } else {
        navigateToInstructionsScreen()
      }
    })
  }, [
    navigate,
    navigateToInstructionsScreen,
    onPress,
    requestBluetoothPermission,
  ])

  return (
    <Button
      label="Afvalpas toevoegen"
      onPress={onPressButton}
      testID="AddWasteCardScreenButton"
    />
  )
}
