import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddresForCoordinates} from '@/modules/address/hooks/useAddresForCoordinates'
import {Address} from '@/modules/address/types'

type Props = {
  hasTitleIcon?: boolean
  lastKnown?: boolean
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
  lastKnown = false,
  loading = false,
  onPress,
}: Props) => {
  const {
    data: address,
    isFetching: addresForCoordinatesIsFetching,
    isLoading: addresForCoordinatesIsLoading,
  } = useAddresForCoordinates(lastKnown)
  const isLoading =
    loading || addresForCoordinatesIsFetching || addresForCoordinatesIsLoading
  const handlePress = useCallback(
    () => onPress(!isLoading && !!address),
    [address, isLoading, onPress],
  )

  return (
    <TopTaskButton
      iconName="location"
      onPress={handlePress}
      text={getText(isLoading, address)}
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
