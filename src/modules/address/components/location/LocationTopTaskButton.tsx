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
} & TestProps

const getText = (loading: boolean, address?: Address) => {
  if (loading) {
    return '...'
  }

  if (address?.addressLine1) {
    return `In de buurt van ${address.addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  hasTitleIcon,
  coordinates,
  loading = false,
  onPress,
  testID,
}: Props) => {
  const {firstAddress: address, isFetching: addressForCoordinatesIsFetching} =
    useAddressForCoordinates(coordinates)

  const isLoading = loading || addressForCoordinatesIsFetching

  const handlePress = useCallback(
    () => onPress(!isLoading && !!address),
    [address, isLoading, onPress],
  )

  return (
    <TopTaskButton
      iconName="location"
      onPress={handlePress}
      testID={testID}
      text={getText(isLoading, address)}
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
