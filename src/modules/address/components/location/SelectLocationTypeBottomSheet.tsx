import {useEffect} from 'react'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useCurrentCoordinates} from '@/modules/address/hooks/useCurrentCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {AddressModalName} from '@/modules/address/routes'
import {addLastKnownCoordinates} from '@/modules/address/slice'
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
  const dispatch = useDispatch()
  const {close, isOpen} = useBottomSheet()
  const address = useAddress()
  const {getCurrentCoordinates, pending} = useGetCurrentCoordinates()
  const currentCoordinates = useCurrentCoordinates()

  useEffect(() => {
    if (isOpen) {
      getCurrentCoordinates()
    }
  }, [getCurrentCoordinates, isOpen])

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
            testID="BottomSheetSelectAddressButton"
          />
          {/* TODO: handle unhappy flow, e.g. user does not give permission */}
          <LocationTopTaskButton
            lastKnown={false}
            loading={pending}
            onPress={() => {
              if (currentCoordinates) {
                dispatch(addLastKnownCoordinates(currentCoordinates))
              }

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
