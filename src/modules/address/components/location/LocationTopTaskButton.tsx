import {useCallback} from 'react'
import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {Address, Coordinates} from '@/modules/address/types'

type Props = {
  coordinates?: Coordinates
  hasPermissionError?: boolean
  hasTitleIcon?: boolean
  loading?: boolean
  locationPermissionIsBlocked?: boolean
  onPress: (hasValidAddressData: boolean) => void
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
  hasPermissionError,
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
    <StatefulTopTaskButton
      iconName="location"
      isError={hasPermissionError}
      isLoading={isLoading}
      onPress={handlePress}
      testID={testID}
      text={getText(isLoading, locationPermissionIsBlocked, address)}
      title="Mijn huidige locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
