import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddresForCoordinates} from '@/modules/address/hooks/useAddresForCoordinates'

type Props = {
  hasTitleIcon?: boolean
  lastKnown?: boolean
  onPress: () => void
} & TestProps

export const LocationTopTaskButton = ({
  hasTitleIcon,
  lastKnown = false,
  onPress,
}: Props) => {
  const {data: address} = useAddresForCoordinates(lastKnown)

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      text={
        address?.addressLine1
          ? `In de buurt van ${address.addressLine1}`
          : 'Geef uw locatie door'
      }
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
