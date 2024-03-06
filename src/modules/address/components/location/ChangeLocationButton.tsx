import {type TestProps} from '@/components/ui/types'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useLocationType} from '@/modules/address/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ChangeLocationButton = ({testID}: TestProps) => {
  const {open} = useBottomSheet()
  const locationType = useLocationType()

  const TopTaskButton =
    locationType === 'address' ? AddressTopTaskButton : LocationTopTaskButton

  return (
    <TopTaskButton
      hasTitleIcon
      onPress={open}
      testID={`${testID ?? ''}ChangeLocationButton`}
    />
  )
}
