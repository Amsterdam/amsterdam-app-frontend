import MapView from 'react-native-maps'
import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {useMapControlsOptions} from '@/components/features/map/hooks/useMapControlsOptions'
import {type ControlVariant} from '@/components/features/map/types'
import {Column} from '@/components/ui/layout/Column'

type Props = {
  mapRef: React.RefObject<MapView | null>
  variants: ControlVariant[]
}

export const MapControls = ({mapRef, variants}: Props) => {
  const options = useMapControlsOptions(mapRef, variants)

  return (
    <Column gutter="sm">
      {options.map(({iconName, key, onPress, testID}) => (
        <MapControlsButton
          iconName={iconName}
          key={key}
          onPress={onPress}
          testID={testID}
        />
      ))}
    </Column>
  )
}
