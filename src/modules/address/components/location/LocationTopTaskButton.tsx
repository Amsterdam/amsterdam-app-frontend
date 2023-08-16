import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useLastKnownLocationAddress} from '@/modules/address/hooks/useLastKnownLocationAddress'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
  showAddress?: boolean
} & TestProps

// TODO: implementatie (87654)
export const LocationTopTaskButton = ({
  hasTitleIcon,
  onPress,
  showAddress = false,
}: Props) => {
  const lastKnownLocationAddress = useLastKnownLocationAddress()

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      text={
        showAddress && lastKnownLocationAddress?.addressLine1
          ? `In de buurt van ${lastKnownLocationAddress.addressLine1}`
          : 'Geef uw locatie door'
      }
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
