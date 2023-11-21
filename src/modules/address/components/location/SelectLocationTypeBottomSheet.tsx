import {useCallback, useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {
  PermissionStatus,
  RESULTS as permissionStatuses,
} from 'react-native-permissions'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePermission} from '@/hooks/usePermission'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {
  GetCurrentPositionError,
  useGetCurrentCoordinates,
} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {AddressModalName} from '@/modules/address/routes'
import {useLocationPermissionBlockedForAndroid} from '@/modules/address/slice'
import {
  addLastKnownCoordinates,
  setLocationPermissionBlockedForAndroid,
  setLocationType,
} from '@/modules/address/slice'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'
import {locationPermission} from '@/utils/permissions/location'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  slug: ModuleSlug
}

const hasPermission = (
  locationPermissionBlockedForAndroid = false,
  locationPermissionStatus?: PermissionStatus,
) => {
  if (Platform.OS === 'android') {
    return !locationPermissionBlockedForAndroid
  }

  return locationPermissionStatus !== permissionStatuses.BLOCKED
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
  slug,
}: Props) => {
  const dispatch = useDispatch()
  const address = useAddress()

  const {navigate} = useNavigation<AddressModalName>()
  const navigateToInstructionsScreen = useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )

  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()

  const getCurrentCoordinates = useGetCurrentCoordinates(highAccuracyPurposeKey)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const [hasLocationTechnicalError, setHasLocationTechnicalError] =
    useState(false)

  const {status: locationPermissionStatus} = usePermission({
    permission: locationPermission,
  })
  const locationPermissionBlockedForAndroid =
    useLocationPermissionBlockedForAndroid()

  const hasLocationPermission = hasPermission(
    locationPermissionBlockedForAndroid,
    locationPermissionStatus,
  )

  const onPressAddressButton = useCallback(() => {
    dispatch(
      setLocationType({
        locationType: 'address',
        slug,
      }),
    )

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    closeBottomSheet()
  }, [address, closeBottomSheet, dispatch, navigate, slug])

  const onPressLocationButton = useCallback(
    async (hasValidAddressData: boolean) => {
      setHasLocationTechnicalError(false)

      if (!hasLocationPermission) {
        navigateToInstructionsScreen()

        return
      }

      const lastKnownCoordinates = currentCoordinates

      if (!lastKnownCoordinates) {
        // if there are no current coordinates, we request them on press
        try {
          setRequestingCurrentCoordinates(true)

          const coordinates = await getCurrentCoordinates()

          setCurrentCoordinates(coordinates)
        } catch (error) {
          const {status} = error as GetCurrentPositionError
          const isPermissionError = isPermissionErrorStatus(status)

          dispatch(
            setLocationPermissionBlockedForAndroid(
              status === permissionStatuses.BLOCKED,
            ),
          )

          if (!isPermissionError) {
            setHasLocationTechnicalError(true)
          }

          return
        } finally {
          setRequestingCurrentCoordinates(false)
        }
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
      navigateToInstructionsScreen,
      hasLocationPermission,
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

  useEffect(() => {
    !bottomSheetIsOpen && setHasLocationTechnicalError(false)
  }, [bottomSheetIsOpen])

  return (
    <BottomSheet testID="SelectLocationTypeBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Row
            align="between"
            valign="center">
            <Title
              accessibilityHint="kies of u uw adres of huidige locatie wil gebruiken"
              level="h3"
              ref={focusRef}
              text="Locaties"
            />
            {!!address && (
              <Button
                label="Wijzig adres"
                onPress={() => {
                  navigate(ModuleSlug.user)

                  dispatch(
                    setLocationType({
                      locationType: 'address',
                      slug,
                    }),
                  )
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
            hasLocationPermission={hasLocationPermission}
            hasTechnicalError={hasLocationTechnicalError}
            loading={requestingCurrentCoordinates}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
