import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {type ControlVariant} from '@/components/features/map/types'
import {useMapControlsOptions} from '@/components/features/map/useMapControlsOptions'
import {Column} from '@/components/ui/layout/Column'

type Props = {
  variants: ControlVariant[]
}

export const MapControls = ({variants}: Props) => {
  const options = useMapControlsOptions(variants)

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
