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
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {AddressModalName} from '@/modules/address/routes'
import {addLastKnownCoordinates, setLocationType} from '@/modules/address/slice'
import {Coordinates} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  slug: ModuleSlug
}

export const SelectLocationTypeBottomSheet = ({slug}: Props) => {
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const navigation = useNavigation<AddressModalName>()
  const dispatch = useDispatch()
  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const address = useAddress()
  const getCurrentCoordinates = useGetCurrentCoordinates()

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
    closeBottomSheet()
  }, [address, closeBottomSheet, dispatch, navigation, slug])

  const onPressLocationButton = useCallback(
    async (hasValidAddressData: boolean) => {
      const lastKnownCoordinates = currentCoordinates

      if (!lastKnownCoordinates) {
        // if there are no current coordinates, we request them on press
        setRequestingCurrentCoordinates(true)
        const coordinates = await getCurrentCoordinates()

        setCurrentCoordinates(coordinates)
        setRequestingCurrentCoordinates(false)
      }

      if (!hasValidAddressData) {
        return
      }

      if (lastKnownCoordinates) {
        dispatch(addLastKnownCoordinates(lastKnownCoordinates))
      }

      dispatch(
        setLocationType({
          locationType: 'location',
          slug,
        }),
      )
      closeBottomSheet()
    },
    [
      closeBottomSheet,
      currentCoordinates,
      dispatch,
      getCurrentCoordinates,
      slug,
    ],
  )

  const hasCurrentCoordinates = !!currentCoordinates

  useEffect(() => {
    // if there are current coordinates already, we request new ones when the sheet is opened
    if (bottomSheetIsOpen && hasCurrentCoordinates) {
      setRequestingCurrentCoordinates(true)
      void getCurrentCoordinates().then(coordinates => {
        setCurrentCoordinates(coordinates)
        setRequestingCurrentCoordinates(false)
      })
    }
    // we delibarately omit `hasCurrentCoordinates` because we want to prevent triggering this when the coordinates are set via `onPressLocationButton`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentCoordinates, bottomSheetIsOpen])

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
          <LocationTopTaskButton
            coordinates={currentCoordinates}
            loading={requestingCurrentCoordinates}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
