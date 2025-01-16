import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useRequestBluetoothPermission} from '@/modules/waste-container/hooks/useRequestBluetoothPermission'
import {WasteContainerModalName} from '@/modules/waste-container/routes'
import {useGetWasteCardQuery} from '@/modules/waste-container/service'
import {devLog} from '@/processes/development'
import {Permissions} from '@/types/permissions'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()
  const requestBluetoothPermission = useRequestBluetoothPermission()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.bluetooth,
  )
  const {address} = useSelectedAddress()

  const {data} = useGetWasteCardQuery(
    address?.postcode
      ? {
          postal_code: address?.postcode,
        }
      : skipToken,
  )

  devLog(data)

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
