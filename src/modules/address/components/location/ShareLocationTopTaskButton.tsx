import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {RequestTopTaskButton} from '@/modules/address/components/location/RequestTopTaskButton'
import {useLocationType} from '@/modules/address/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = TestProps

export const ShareLocationTopTaskButton = ({testID}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()
  const locationType = useLocationType()

  const TopTaskButton =
    typeof locationType === 'undefined'
      ? RequestTopTaskButton
      : locationType === 'address'
        ? AddressTopTaskButton
        : LocationTopTaskButton

  return (
    <Column>
      <TopTaskButton
        hasTitleIcon
        onPress={openBottomSheet}
        testID={`${testID ?? ''}RequestLocationButton`}
      />
    </Column>
  )
}
