import {useMemo} from 'react'
import {Platform} from 'react-native'
import type {ModuleSlug} from '@/modules/slugs'
import {useMapControlsLocationButton} from '@/components/features/map/hooks/useMapControlsLocationButton'
import {ControlVariant, MapControlOption} from '@/components/features/map/types'
import {Permissions} from '@/types/permissions'

export const useMapControlsOptions = (
  options: ControlVariant[],
  moduleSlug: ModuleSlug,
) => {
  const {onPressLocationButton, iconName} =
    useMapControlsLocationButton(moduleSlug)

  const controlOptions: Record<
    ControlVariant,
    MapControlOption & {requiresPermission?: Permissions}
  > = useMemo(
    () => ({
      [ControlVariant.location]: {
        accessibilityLabel: 'Mijn locatie',
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
