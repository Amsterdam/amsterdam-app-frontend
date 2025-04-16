import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingPermitTopTaskButton = () => {
  const {toggle} = useBottomSheet()
  const {currentPermitName} = useCurrentParkingPermitName()

  if (!currentPermitName) {
    return (
      <SomethingWentWrong testID="ParkingPermitTopTaskButtonSomethingWentWrong" />
    )
  }

  return (
    <TopTaskButton
      iconName="documentCheckmark"
      onPress={toggle}
      testID="ParkingPermitTopTaskButton"
      title={currentPermitName}
      titleIconName="chevron-down"
    />
  )
}
