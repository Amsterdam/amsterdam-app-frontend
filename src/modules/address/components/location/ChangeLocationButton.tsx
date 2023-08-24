import {TestProps} from '@/components/ui/types'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useLocationTypeForModule} from '@/modules/address/hooks/useLocationTypeForModule'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {slug: ModuleSlug} & TestProps

export const ChangeLocationButton = ({slug, testID}: Props) => {
  const {open} = useBottomSheet()
  const locationType = useLocationTypeForModule(slug)

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
