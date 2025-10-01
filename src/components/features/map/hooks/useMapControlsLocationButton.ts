import {useCallback} from 'react'
import MapView from 'react-native-maps'
import {IconProps} from '@/components/ui/media/Icon'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {useStartGettingLocation} from '@/modules/address/hooks/useStartGettingLocation'
import {useLocation} from '@/modules/address/slice'
import {Permissions} from '@/types/permissions'

const getIconNameLocation = (
  isSetLocation: boolean,
  isGettingLocation?: boolean,
): IconProps['name'] => {
  if (isGettingLocation) {
    return 'spinner'
  }

  return isSetLocation ? 'mapLocationIosFilled' : 'mapLocationIos'
}

export const useMapControlsLocationButton = (
  mapRef: React.RefObject<MapView | null>,
) => {
  const {address, locationType} = useSelectedAddress()
  const {isGettingLocation} = useLocation()
  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )
  const setLocationType = useSetLocationType()

  const {makeSetStartGettingLocation} = useStartGettingLocation()

  const isSetLocation = locationType === 'location' && !!address?.coordinates

  const onPressLocationButton = useCallback(async () => {
    if (isSetLocation) {
      mapRef.current?.animateToRegion(
        {
          latitude: address.coordinates!.lat,
          longitude: address.coordinates!.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      )

      return
    }

    const permission = await requestLocationPermission()

    makeSetStartGettingLocation()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')
  }, [
    address?.coordinates,
    isSetLocation,
    makeSetStartGettingLocation,
    mapRef,
    navigateToInstructionsScreen,
    requestLocationPermission,
    setLocationType,
  ])

  const iconName = getIconNameLocation(isSetLocation, isGettingLocation)

  return {onPressLocationButton, iconName}
}
