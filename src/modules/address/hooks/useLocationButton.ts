import {useCallback, useEffect, useState} from 'react'
import {RESULTS as permissionStatuses} from 'react-native-permissions'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePermission} from '@/hooks/usePermission'

import {
  GetCurrentPositionError,
  useGetCurrentCoordinates,
} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {useGetLocationType} from '@/modules/address/hooks/useGetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {
  setNoLocationPermissionForAndroid,
  addLastKnownCoordinates,
  useNoLocationPermissionForAndroid,
} from '@/modules/address/slice'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {hasPermission} from '@/modules/address/utils/hasPermission'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isPermissionErrorStatus} from '@/utils/permissions/errorStatuses'
import {PERMISSION_LOCATION} from '@/utils/permissions/permissionsForPlatform'

export const useLocationButton = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()
  const {navigate} = useNavigation()
  const {setLocationType, locationType} = useGetLocationType()
  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const noLocationPermissionForAndroid = useNoLocationPermissionForAndroid()
  const getCurrentCoordinates = useGetCurrentCoordinates(highAccuracyPurposeKey)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>()
  const [isLoadingCurrentCoordinates, setIsLoadingCurrentCoordinates] =
    useState(false)
  const [hasLocationTechnicalError, setHasLocationTechnicalError] =
    useState(false)

  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  const {status: locationPermissionStatus} = usePermission({
    permission: PERMISSION_LOCATION,
  })

  const navigateToInstructionsScreen = useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )

  const hasLocationPermission = hasPermission(
    noLocationPermissionForAndroid,
    locationPermissionStatus,
  )

  useEffect(() => {
    !bottomSheetIsOpen && setHasLocationTechnicalError(false)
  }, [bottomSheetIsOpen])

  useEffect(() => {
    if (!hasLocationPermission) {
      setLocationType('address')
    }
  }, [hasLocationPermission, setLocationType])

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
          setIsLoadingCurrentCoordinates(true)

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
          setIsLoadingCurrentCoordinates(false)
        }
      }

      if (!hasValidAddressData) {
        return
      }

      if (lastKnownCoordinates) {
        dispatch(addLastKnownCoordinates(lastKnownCoordinates))
      }

      setLocationType('location')

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
      setLocationType,
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

    setIsLoadingCurrentCoordinates(true)
    getCurrentCoordinates()
      .then(coordinates => {
        setCurrentCoordinates(coordinates)
        setIsLoadingCurrentCoordinates(false)
      })
      .catch(() => {
        setIsLoadingCurrentCoordinates(false)
      })

    // we deliberately omit `hasCurrentCoordinates` because we want to prevent triggering this when the coordinates are set the first time, via `onPressLocationButton`
  }, [getCurrentCoordinates, bottomSheetIsOpen, hasCurrentCoordinates])

  return {
    onPress: onPressLocationButton,
    hasLocationError: hasLocationTechnicalError,
    hasLocationPermission: hasLocationPermission,
    currentCoordinates,
    isLoadingCurrentCoordinates,
  }
}
