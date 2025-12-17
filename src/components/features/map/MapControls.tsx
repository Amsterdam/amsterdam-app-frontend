import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {useMapControlsOptions} from '@/components/features/map/hooks/useMapControlsOptions'
import {type ControlVariant} from '@/components/features/map/types'
import {Column} from '@/components/ui/layout/Column'

type Props = {
  variants: ControlVariant[]
}

export const MapControls = ({variants}: Props) => {
  const options = useMapControlsOptions(variants)

  return (
    <Column gutter="sm">
      {options.map(({accessibilityLabel, iconName, key, onPress, testID}) => (
        <MapControlsButton
          accessibilityLabel={accessibilityLabel}
          iconName={iconName}
          key={key}
          onPress={onPress}
          testID={testID}
        />
      ))}
    </Column>
  )
}
