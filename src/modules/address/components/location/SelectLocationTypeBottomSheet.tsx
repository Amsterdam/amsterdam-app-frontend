import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useRequestLocation} from '@/modules/address/hooks/useRequestLocation'
import {AddressModalName} from '@/modules/address/routes'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  onSelectAddress: () => void
  onSelectLocation: () => void
}

export const SelectLocationTypeBottomSheet = ({
  onSelectAddress,
  onSelectLocation,
}: Props) => {
  const navigation = useNavigation<AddressModalName>()
  const {close} = useBottomSheet()
  const address = useAddress()
  const requestLocation = useRequestLocation()

  return (
    <BottomSheet>
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

              onSelectAddress()
              close()
            }}
            showAddress
            testID="BottomSheetSelectAddressButton"
          />
          <LocationTopTaskButton
            onPress={() => {
              requestLocation()
              onSelectLocation()
              close()
            }}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
