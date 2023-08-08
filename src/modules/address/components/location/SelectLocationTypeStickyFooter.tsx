import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {SelectLocationType} from '@/modules/address/components/location/SelectLocationType'

type Props = {
  testIdPrefix?: string
}

export const SelectLocationTypeStickyFooter = ({testIdPrefix}: Props) => (
  <BottomSheet>
    <SelectLocationType testIdPrefix={testIdPrefix} />
  </BottomSheet>
)
