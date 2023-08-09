import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useLocation} from '@/modules/address/hooks/useLocation'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
} & TestProps

// TODO: implementatie (87654)
export const LocationTopTaskButton = ({hasTitleIcon, onPress}: Props) => {
  const location = useLocation()

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      text={
        location?.addressLine1
          ? `In de buurt van ${location?.addressLine1}`
          : 'Geef uw locatie door'
      }
      title="Mijn locatie"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
