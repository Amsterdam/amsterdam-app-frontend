import {type TestProps} from '@/components/ui/types'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useLocationType} from '@/modules/address/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = TestProps

export const ShareLocationTopTaskButton = ({testID}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()
  const locationType = useLocationType()

  const TopTaskButton =
    locationType === 'address' ? AddressTopTaskButton : LocationTopTaskButton

  return (
    <TopTaskButton
      hasTitleIcon
      onPress={openBottomSheet}
      testID={`${testID ?? ''}RequestLocationButton`}
    />
  )
}
