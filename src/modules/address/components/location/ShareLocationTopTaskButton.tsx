import {type TestProps} from '@/components/ui/types'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {RequestTopTaskButton} from '@/modules/address/components/location/RequestTopTaskButton'
import {useLocationType} from '@/modules/address/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {newVariant?: string} & TestProps

export const ShareLocationTopTaskButton = ({newVariant, testID}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()
  const locationType = useLocationType()

  const TopTaskButton =
    typeof locationType === 'undefined'
      ? RequestTopTaskButton
      : locationType === 'address'
        ? AddressTopTaskButton
        : LocationTopTaskButton

  return (
    <TopTaskButton
      hasTitleIcon
      onPress={() => openBottomSheet(newVariant)}
      testID={testID}
    />
  )
}
