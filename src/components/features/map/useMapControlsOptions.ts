import {useMemo} from 'react'
import {ControlVariant, MapControlOption} from '@/components/features/map/types'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const useMapControlsOptions = (options: ControlVariant[]) => {
  const {
    hasPermission: hasLocationPermission,
    requestPermission: requestLocationPermission,
  } = usePermission(Permissions.location)

  const controlOptions: Record<
    ControlVariant,
    MapControlOption & {requiresPermission?: Permissions}
  > = useMemo(
    () => ({
      [ControlVariant.location]: {
        iconName: 'locationArrow',
        key: ControlVariant.location,
        onPress: requestLocationPermission,
        testID: 'MapControlsLocationButton',
      },
    }),
    [requestLocationPermission],
  )

  return useMemo(
    () =>
      options
        .filter(
          option =>
            !(
              controlOptions[option]?.key === ControlVariant.location &&
              hasLocationPermission
            ),
        )
        .map(option => controlOptions[option]),
    [options, controlOptions, hasLocationPermission],
  )
}
