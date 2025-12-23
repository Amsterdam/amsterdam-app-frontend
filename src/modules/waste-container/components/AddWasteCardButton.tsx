import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestBluetoothPermission} from '@/modules/waste-container/hooks/useRequestBluetoothPermission'
import {WasteContainerModalName} from '@/modules/waste-container/routes'
import {useGetWasteCardQuery} from '@/modules/waste-container/service'
import {ReduxKey} from '@/store/types/reduxKey'
import {Permissions} from '@/types/permissions'
import {SecureItemKey} from '@/utils/secureStorage'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()
  const requestBluetoothPermission = useRequestBluetoothPermission()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.bluetooth,
  )
  const setSecureItem = useSetSecureItem()
  const {address} = useModuleBasedSelectedAddress(ReduxKey.address)

  const {data} = useGetWasteCardQuery(
    address?.postcode
      ? {
          postal_code: address?.postcode,
        }
      : skipToken,
  )

  const onPressButton = useCallback(() => {
    void requestBluetoothPermission().then(hasBTPermission => {
      if (hasBTPermission) {
        if (data?.has_container) {
          void setSecureItem(
            SecureItemKey.wasteCardNumber,
            data.pass_number,
          ).then(() => {
            navigate(WasteContainerModalName.addWasteCardSuccess)
          })
        }
      } else {
        navigateToInstructionsScreen()
      }
    })
  }, [
    data,
    navigate,
    navigateToInstructionsScreen,
    requestBluetoothPermission,
    setSecureItem,
  ])

  return (
    <Button
      label="Afvalpas toevoegen"
      onPress={onPressButton}
      testID="AddWasteCardScreenButton"
    />
  )
}
