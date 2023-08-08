import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {AddressModalName} from '@/modules/address/routes'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  testIdPrefix?: string
}

export const SelectLocationType = ({testIdPrefix = ''}: Props) => {
  const navigation = useNavigation()
  const {close} = useBottomSheet()
  const address = useAddress()

  return (
    <Box grow>
      <Column gutter="md">
        <Title
          level="h3"
          text="Locaties"
        />
        <AddressTopTaskButton
          onPress={() => {
            if (!address) {
              navigation.navigate(AddressModalName.addressForm)
            }

            close()
          }}
          testID={`${testIdPrefix}SelectAddressButton`}
        />
        {/* TODO: implement @/modules/address/components/location/LocationTopTaskButton (87654) with testID `SelectLocationButton` */}
      </Column>
    </Box>
  )
}
