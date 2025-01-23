import {useIsPermissionFeatureAvailableOnDevice} from '@/hooks/permissions/useIsPermissionFeatureAvailableOnDevice'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {AddWasteCardButton} from '@/modules/waste-guide/components/waste-card/AddWasteCardButton'
import {ShowWasteCardButton} from '@/modules/waste-guide/components/waste-card/ShowWasteCardButton'
import {Permissions} from '@/types/permissions'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  showAddOnly?: boolean
}

export const WasteCardButton = ({showAddOnly}: Props) => {
  const isBluetoothAvailable = useIsPermissionFeatureAvailableOnDevice(
    Permissions.bluetooth,
  )
  const isWasteContainerModuleActive = useIsModuleActive(
    ModuleSlug['waste-container'],
  )

  const {item: secureWasteCardNumber, isLoading} = useGetSecureItem(
    SecureItemKey.wasteCardNumber,
  )

  if (!isWasteContainerModuleActive || isLoading || !isBluetoothAvailable) {
    return null
  }

  if (!!secureWasteCardNumber && !showAddOnly) {
    return <ShowWasteCardButton />
  }

  if (!secureWasteCardNumber) {
    return <AddWasteCardButton />
  }

  return null
}
