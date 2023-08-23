import {useCallback, useEffect, useState} from 'react'
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
import {addLastKnownCoordinates, setLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  slug: ModuleSlug
}

export const SelectLocationTypeBottomSheet = ({slug}: Props) => {
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const navigation = useNavigation<AddressModalName>()
  const dispatch = useDispatch()
  const {close, isOpen} = useBottomSheet()
  const address = useAddress()
  const getCurrentCoordinates = useGetCurrentCoordinates()
  const currentCoordinates = useCurrentCoordinates()

  const onPressAddressButton = useCallback(() => {
    if (!address) {
      navigation.navigate(AddressModalName.addressForm)
    }

    dispatch(
      setLocationType({
        locationType: 'address',
        slug,
      }),
    )
    close()
  }, [address, close, dispatch, navigation, slug])

  const onPressLocationButton = useCallback(
    async (hasValidAddressData: boolean) => {
      if (!currentCoordinates) {
        setRequestingCurrentCoordinates(true)
        await getCurrentCoordinates()
        setRequestingCurrentCoordinates(false)
      }

      if (!hasValidAddressData) {
        return
      }

      if (currentCoordinates) {
        dispatch(addLastKnownCoordinates(currentCoordinates))
      }

      dispatch(
        setLocationType({
          locationType: 'location',
          slug,
        }),
      )
      close()
    },
    [close, currentCoordinates, dispatch, getCurrentCoordinates, slug],
  )

  useEffect(() => {
    if (isOpen && currentCoordinates) {
      setRequestingCurrentCoordinates(true)
      void getCurrentCoordinates().then(() =>
        setRequestingCurrentCoordinates(false),
      )
    }
  }, [currentCoordinates, getCurrentCoordinates, isOpen])

  return (
    <BottomSheet testID="SelectLocationTypeBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Title
            level="h3"
            text="Locaties"
          />
          <AddressTopTaskButton
            onPress={onPressAddressButton}
            testID="BottomSheetSelectAddressButton"
          />
          {/* TODO: handle unhappy flow, e.g. user does not give permission */}
          <LocationTopTaskButton
            lastKnown={false}
            loading={requestingCurrentCoordinates}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
