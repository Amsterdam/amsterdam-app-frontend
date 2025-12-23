import {useCallback} from 'react'
import {useMap} from '@/components/features/map/hooks/useMap'
import {IconProps} from '@/components/ui/media/Icon'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {ReduxKey} from '@/store/types/reduxKey'
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

export const useMapControlsLocationButton = () => {
  const {setLocationType, locationType, isFetchingLocation, address} =
    useModuleBasedSelectedAddress(ReduxKey.address)

  const map = useMap()
  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )

  const {startLocationFetch} = useRequestLocationFetch()

  const isSetLocation = locationType === 'location' && !!address?.coordinates

  const onPressLocationButton = useCallback(async () => {
    if (isSetLocation) {
      map?.animateToRegion(
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

    startLocationFetch()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')
  }, [
    address?.coordinates,
    isSetLocation,
    startLocationFetch,
    map,
    navigateToInstructionsScreen,
    requestLocationPermission,
    setLocationType,
  ])

  const iconName = getIconNameLocation(isSetLocation, isFetchingLocation)

  return {onPressLocationButton, iconName}
}
