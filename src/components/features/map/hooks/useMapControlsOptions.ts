import {useMemo} from 'react'
import {Platform} from 'react-native'
import MapView from 'react-native-maps'
import {useMapControlsLocationButton} from '@/components/features/map/hooks/useMapControlsLocationButton'
import {ControlVariant, MapControlOption} from '@/components/features/map/types'
import {Permissions} from '@/types/permissions'

export const useMapControlsOptions = (
  mapRef: React.RefObject<MapView | null>,
  options: ControlVariant[],
) => {
  const {onPressLocationButton, iconName} = useMapControlsLocationButton(mapRef)

  const controlOptions: Record<
    ControlVariant,
    MapControlOption & {requiresPermission?: Permissions}
  > = useMemo(
    () => ({
      [ControlVariant.location]: {
        iconName,
        key: ControlVariant.location,
        onPress: onPressLocationButton,
        testID: 'MapControlsLocationButton',
      },
    }),
    [iconName, onPressLocationButton],
  )

  return useMemo(
    () =>
      options
        .filter(
          option =>
            option !== ControlVariant.location || Platform.OS !== 'android', // Need because issue in package https://github.com/react-native-maps/react-native-maps/issues/5695
        )
        .map(option => controlOptions[option]),
    [options, controlOptions],
  )
}
