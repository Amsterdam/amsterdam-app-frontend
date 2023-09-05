import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {Address, Coordinates} from '@/modules/address/types'

type Props = {
  coordinates?: Coordinates
  hasTitleIcon?: boolean
  loading?: boolean
  locationPermissionIsBlocked?: boolean
  onPress: (hasValidAddressData: boolean) => void
  permissionBlocked?: boolean
} & TestProps

const getText = (
  loading: boolean,
  locationPermissionIsBlocked: boolean,
  address?: Address,
) => {
  if (loading) {
    return '...'
  }

  if (address?.addressLine1 && !locationPermissionIsBlocked) {
    return `In de buurt van ${address.addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  coordinates,
  hasTitleIcon,
  locationPermissionIsBlocked = false,
  loading = false,
  onPress,
  testID,
}: Props) => {
  const {firstAddress: address, isFetching: addressForCoordinatesIsFetching} =
    useAddressForCoordinates({coordinates})

  const isLoading =
    (loading || addressForCoordinatesIsFetching) && !locationPermissionIsBlocked

  const handlePress = useCallback(
    () => onPress(!isLoading && !!address),
    [address, isLoading, onPress],
  )

  return (
    <TopTaskButton
      iconName="location"
      onPress={handlePress}
      testID={testID}
      text={getText(isLoading, locationPermissionIsBlocked, address)}
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
