import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddress} from '@/modules/address/hooks/useAddress'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
} & TestProps

export const AddressTopTaskButton = ({
  hasTitleIcon,
  onPress,
  testID,
}: Props) => {
  const address = useAddress()

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      testID={testID}
      text={address?.addressLine1 ? address.addressLine1 : 'Vul een adres in'}
      title="Mijn adres"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
