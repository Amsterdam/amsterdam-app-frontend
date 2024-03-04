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
import {useLocationType} from '@/modules/address/hooks/useLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {useNoLocationPermissionForAndroid} from '@/modules/address/slice'
import {
  addLastKnownCoordinates,
  setNoLocationPermissionForAndroid,
  setLocationType,
} from '@/modules/address/slice'
import {
  Coordinates,
  HighAccuracyPurposeKey,
  LocationType,
} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'
import {PERMISSION_LOCATION} from '@/utils/permissions/permissionsForPlatform'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
}

const hasPermission = (
  noLocationPermissionForAndroid = false,
  locationPermissionStatus?: PermissionStatus,
) => {
  if (Platform.OS === 'android') {
    return noLocationPermissionForAndroid === false
  }

  return locationPermissionStatus !== permissionStatuses.BLOCKED
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
}: Props) => {
  const dispatch = useDispatch()
  const locationType = useLocationType()
  const address = useAddress()

  const {navigate} = useNavigation<AddressModalName>()
  const navigateToInstructionsScreen = useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )

  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()

  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  const getCurrentCoordinates = useGetCurrentCoordinates(highAccuracyPurposeKey)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const [requestingCurrentCoordinates, setRequestingCurrentCoordinates] =
    useState(false)
  const [hasLocationTechnicalError, setHasLocationTechnicalError] =
    useState(false)

  const {status: locationPermissionStatus} = usePermission({
    permission: PERMISSION_LOCATION,
  })
  const noLocationPermissionForAndroid = useNoLocationPermissionForAndroid()

  const hasLocationPermission = hasPermission(
    noLocationPermissionForAndroid,
    locationPermissionStatus,
  )

  const setCurrentLocationType = useCallback(
    (type: LocationType) =>
      dispatch(
        setLocationType({
          locationType: type,
        }),
      ),
    [dispatch],
  )

  useEffect(() => {
    if (!hasLocationPermission) {
      setCurrentLocationType('address')
    }
  }, [hasLocationPermission, setCurrentLocationType])

  const onPressAddressButton = useCallback(() => {
    setCurrentLocationType('address')

    if (locationType && locationType !== 'address') {
      onEvent(undefined, {
        dimensions: {
          [PiwikDimension.newState]: 'address',
        },
      })
    }

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    closeBottomSheet()
  }, [
    address,
    closeBottomSheet,
    locationType,
    navigate,
    onEvent,
    setCurrentLocationType,
  ])

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
            setNoLocationPermissionForAndroid(
              status !== permissionStatuses.GRANTED,
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

      setCurrentLocationType('location')

      if (locationType && locationType !== 'location') {
        onEvent(undefined, {
          dimensions: {
            [PiwikDimension.newState]: 'location',
          },
        })
      }

      closeBottomSheet()
    },
    [
      hasLocationPermission,
      currentCoordinates,
      setCurrentLocationType,
      locationType,
      closeBottomSheet,
      navigateToInstructionsScreen,
      getCurrentCoordinates,
      dispatch,
      onEvent,
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

                  setCurrentLocationType('address')
                }}
                testID="BottomSheetChangeAddressButton"
                variant="tertiary"
              />
            )}
          </Row>
          <AddressTopTaskButton
            logName={`BottomSheetAddAddressButton${address?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
            onPress={onPressAddressButton}
            testID="BottomSheetSelectAddressButton"
          />
          <LocationTopTaskButton
            coordinates={currentCoordinates}
            hasLocationPermission={hasLocationPermission}
            hasTechnicalError={hasLocationTechnicalError}
            loading={requestingCurrentCoordinates}
            logName={`BottomSheetSelectLocationButton${hasLocationPermission && currentCoordinates ? 'SelectLocation' : 'AddLocation'}`}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
