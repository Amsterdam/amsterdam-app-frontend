import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {useAddress} from '@/modules/address/slice'
import {type LogProps} from '@/processes/piwik/types'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
} & TestProps &
  LogProps

export const AddressTopTaskButton = ({
  hasTitleIcon,
  onPress,
  testID,
  ...props
}: Props) => {
  const address = useAddress()

  return (
    <TopTaskButton
      iconName="housing"
      iconSize="lg"
      onPress={onPress}
      testID={testID}
      text={address?.addressLine1 ?? 'Vul een adres in'}
      title="Mijn adres"
      titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
      {...props}
    />
  )
}
