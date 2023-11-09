import {useCallback} from 'react'
import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {Coordinates} from '@/modules/address/types'

type Props = {
  coordinates?: Coordinates
  hasLocationPermission?: boolean
  hasTechnicalError?: boolean
  hasTitleIcon?: boolean
  loading?: boolean
  onPress: (hasValidAddressData: boolean) => void
} & TestProps

const getText = (
  loading: boolean,
  hasLocationPermission: boolean,
  addressLine1?: string,
) => {
  if (loading) {
    return '...'
  }

  if (addressLine1 && hasLocationPermission) {
    return `In de buurt van ${addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  coordinates,
  hasTechnicalError,
  hasTitleIcon,
  hasLocationPermission = false,
  loading = false,
  onPress,
  testID,
}: Props) => {
  const {firstAddress: address, isFetching: addressForCoordinatesIsFetching} =
    useAddressForCoordinates({coordinates})

  const isLoading =
    (loading || addressForCoordinatesIsFetching) && hasLocationPermission

  const handlePress = useCallback(
    () => onPress(!isLoading && !!address),
    [address, isLoading, onPress],
  )

  return (
    <StatefulTopTaskButton
      iconName="location"
      isError={hasTechnicalError}
      isLoading={isLoading}
      onPress={handlePress}
      testID={testID}
      text={getText(isLoading, hasLocationPermission, address?.addressLine1)}
      title="Mijn huidige locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
