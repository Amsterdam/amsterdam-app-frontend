import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'
import {useAddress} from '@/modules/address/hooks/useAddress'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
  showAddress?: boolean
} & TestProps

export const AddressTopTaskButton = ({
  hasTitleIcon,
  onPress,
  showAddress = false,
  testID,
}: Props) => {
  const address = useAddress()

  return (
    <TopTaskButton
      iconName="location"
      onPress={onPress}
      testID={testID}
      text={
        showAddress && !!address?.addressLine1
          ? address.addressLine1
          : 'Vul een adres in'
      }
      title="Mijn adres"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    />
  )
}
