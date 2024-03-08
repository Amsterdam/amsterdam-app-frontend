import {useCallback, useEffect, useState} from 'react'
import {RESULTS as permissionStatuses} from 'react-native-permissions'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {
  GetCurrentPositionError,
  useGetCurrentCoordinates,
} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {useLocationPermission} from '@/modules/address/hooks/useLocationPermission'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {
  addLastKnownCoordinates,
  useLocationType,
  setNoLocationPermissionForAndroid,
} from '@/modules/address/slice'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
}: Props) => {
  const dispatch = useDispatch()
  const locationType = useLocationType()
  const address = useAddress()

  const {navigate} = useNavigation<AddressModalName>()
  const setLocationType = useSetLocationType()
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

  const hasLocationPermission = useLocationPermission()

  useEffect(() => {
    if (!hasLocationPermission) {
      setLocationType('address')
    }
  }, [hasLocationPermission, setLocationType])

  const getCoordinates = useCallback(async () => {
    try {
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
    } finally {
      setRequestingCurrentCoordinates(false)
    }
  }, [dispatch, getCurrentCoordinates])

  useEffect(() => {
    if (!bottomSheetIsOpen) {
      setHasLocationTechnicalError(false)

      return
    }

    if (!requestingCurrentCoordinates) {
      void getCoordinates()
    }

    // Fetch coordinates only when the bottomsheet is opened
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomSheetIsOpen])

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (locationType !== 'address') {
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
    setLocationType,
  ])

  const onPressLocationButton = useCallback(
    (hasValidAddressData: boolean) => {
      setHasLocationTechnicalError(false)

      if (!hasLocationPermission) {
        navigateToInstructionsScreen()

        return
      }

      setLocationType('location')

      if (!hasValidAddressData) {
        return
      }

      if (currentCoordinates) {
        dispatch(addLastKnownCoordinates(currentCoordinates))
      }

      if (locationType !== 'location') {
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
      setLocationType,
      locationType,
      closeBottomSheet,
      navigateToInstructionsScreen,
      dispatch,
      onEvent,
    ],
  )

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

                  setLocationType('address')
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
