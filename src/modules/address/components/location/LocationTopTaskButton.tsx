import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {Address, Coordinates} from '@/modules/address/types'

type Props = {
  coordinates?: Coordinates
  hasTitleIcon?: boolean
  loading?: boolean
  onPress: (hasValidAddressData: boolean) => void
  permissionBlocked?: boolean
} & TestProps

const getText = (
  loading: boolean,
  permissionBlocked: boolean,
  address?: Address,
) => {
  if (loading) {
    return '...'
  }

  if (address?.addressLine1 && !permissionBlocked) {
    return `In de buurt van ${address.addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  coordinates,
  hasTitleIcon,
  loading = false,
  onPress,
  permissionBlocked = false,
  testID,
}: Props) => {
  const {firstAddress: address, isFetching: addressForCoordinatesIsFetching} =
    useAddressForCoordinates({coordinates})

  const isLoading =
    (loading || addressForCoordinatesIsFetching) && !permissionBlocked

  const handlePress = useCallback(
    () => onPress(!isLoading && !!address),
    [address, isLoading, onPress],
  )

  return (
    <TopTaskButton
      iconName="location"
      onPress={handlePress}
      testID={testID}
      text={getText(isLoading, permissionBlocked, address)}
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
