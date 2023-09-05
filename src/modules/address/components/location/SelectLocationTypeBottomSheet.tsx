import {useCallback, useEffect, useState} from 'react'
import {RESULTS} from 'react-native-permissions'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePermission} from '@/hooks/usePermission'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {GetCurrentPositionError} from '@/modules/address/hooks/useGetCurrentPosition'
import {AddressModalName} from '@/modules/address/routes'
import {addLastKnownCoordinates, setLocationType} from '@/modules/address/slice'
import {Coordinates} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {locationPermissionByPlatform} from '@/permissions'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'
import {locationPermission} from '@/utils/permissions/location'

type Props = {
  slug: ModuleSlug
}

export const SelectLocationTypeBottomSheet = ({slug}: Props) => {
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const {navigate} = useNavigation<AddressModalName>()
  const dispatch = useDispatch()
  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const address = useAddress()
  const getCurrentCoordinates = useGetCurrentCoordinates()
  const navigateToInstructionsScreen = useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )
  const {status: locationPermissionStatus} = usePermission({
    permission: locationPermission,
  })
  const locationPermissionIsBlocked =
    locationPermissionStatus === RESULTS.BLOCKED

  const onPressAddressButton = useCallback(() => {
    if (!address) {
      navigate(AddressModalName.addressForm)
    }

    dispatch(
      setLocationType({
        locationType: 'address',
        slug,
      }),
    )
    closeBottomSheet()
  }, [address, closeBottomSheet, dispatch, navigate, slug])

  const onPressLocationButton = useCallback(
    async (hasValidAddressData: boolean) => {
      if (locationPermissionIsBlocked) {
        navigateToInstructionsScreen()

        return
      }

      const lastKnownCoordinates = currentCoordinates

      if (!lastKnownCoordinates) {
        // if there are no current coordinates, we request them on press
        setRequestingCurrentCoordinates(true)

        try {
          const coordinates = await getCurrentCoordinates()

          setCurrentCoordinates(coordinates)
        } catch (error) {
          const {status} = error as GetCurrentPositionError

          if (isPermissionErrorStatus(status)) {
            navigateToInstructionsScreen()
          }
        }

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
      locationPermissionIsBlocked,
      navigateToInstructionsScreen,
      slug,
    ],
  )

  const hasCurrentCoordinates = !!currentCoordinates

  useEffect(() => {
    if (!(bottomSheetIsOpen && hasCurrentCoordinates)) {
      return
    }

    setRequestingCurrentCoordinates(true)
    getCurrentCoordinates()
      .then(coordinates => {
        setCurrentCoordinates(coordinates)
        setRequestingCurrentCoordinates(false)
      })
      .catch(() => {
        setRequestingCurrentCoordinates(false)
      })

    // we deliberately omit `hasCurrentCoordinates` because we want to prevent triggering this when the coordinates are set the first time, via `onPressLocationButton`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentCoordinates, bottomSheetIsOpen])

  return (
    <BottomSheet testID="SelectLocationTypeBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Row
            align="between"
            valign="center">
            <Title
              level="h3"
              text="Locaties"
            />
            {!!address && (
              <Button
                label="Wijzig adres"
                onPress={() => {
                  navigate(ModuleSlug.user)
                }}
                testID="BottomSheetChangeAddressButton"
                variant="tertiary"
              />
            )}
          </Row>
          <AddressTopTaskButton
            onPress={onPressAddressButton}
            testID="BottomSheetSelectAddressButton"
          />
          <LocationTopTaskButton
            coordinates={currentCoordinates}
            loading={requestingCurrentCoordinates}
            locationPermissionIsBlocked={locationPermissionIsBlocked}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
