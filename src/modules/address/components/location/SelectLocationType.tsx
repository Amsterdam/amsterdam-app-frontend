import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useRequestLocation} from '@/modules/address/hooks/useRequestLocation'
import {AddressModalName} from '@/modules/address/routes'
import {setLocationType} from '@/modules/waste-guide/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const SelectLocationType = () => {
  const navigation = useNavigation<AddressModalName>()
  const {close} = useBottomSheet()
  const address = useAddress()
  const requestLocation = useRequestLocation()
  const dispatch = useDispatch()

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

            dispatch(setLocationType('address'))
            close()
          }}
          testID="BottomSheetSelectAddressButton"
        />
        <LocationTopTaskButton
          onPress={() => {
            requestLocation()
            dispatch(setLocationType('location'))
            close()
          }}
          testID="BottomSheetSelectLocationButton"
        />
      </Column>
    </Box>
  )
}
