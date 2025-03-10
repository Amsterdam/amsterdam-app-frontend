import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingChooseLicensePlateTopTaskButton = () => {
  const {toggle} = useBottomSheet()
  const {currentPermitName} = useCurrentParkingPermitName()

  if (!currentPermitName) {
    return (
      <SomethingWentWrong testID="ParkingChooseLicensePlateTopTaskButtonSomethingWentWrong" />
    )
  }

  return (
    <TopTaskButton
      iconName="parkingCar"
      onPress={toggle}
      testID="ParkingChooseLicensePlateTopTaskButton"
      title="Kies kenteken"
      titleIconName={'chevron-down'}
    />
  )
}
