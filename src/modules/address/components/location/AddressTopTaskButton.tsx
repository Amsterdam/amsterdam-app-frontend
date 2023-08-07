import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
}

export const AddressTopTaskButton = ({hasTitleIcon, onPress}: Props) => {
  const address = useAddress()

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      text={address?.addressLine1 ?? 'Vul een adres in'}
      title="Mijn adres"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
