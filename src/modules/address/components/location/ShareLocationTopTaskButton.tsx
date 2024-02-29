import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = TestProps

export const ShareLocationTopTaskButton = ({testID}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()

  return (
    <TopTaskButton
      iconName="location"
      onPress={openBottomSheet}
      testID={`${testID ?? ''}RequestLocationButton`}
      title="Geef uw locatie door"
      titleIconName="chevron-down"
    />
  )
}
