import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddresForCoordinates} from '@/modules/address/hooks/useAddresForCoordinates'
import {useCurrentCoordinates} from '@/modules/address/hooks/useCurrentCoordinates'
import {Address} from '@/modules/address/types'

type Props = {
  hasTitleIcon?: boolean
  lastKnown?: boolean
  loading?: boolean
  onPress: () => void
} & TestProps

const getText = (isLoading: boolean, address?: Address) => {
  if (isLoading) {
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
  const coordinates = useCurrentCoordinates()
  const {data: address, isLoading} = useAddresForCoordinates(lastKnown)

  return (
    <TopTaskButton
      iconName="location"
      onPress={!isLoading && !!coordinates ? onPress : undefined}
      text={getText(loading || isLoading, address)}
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
