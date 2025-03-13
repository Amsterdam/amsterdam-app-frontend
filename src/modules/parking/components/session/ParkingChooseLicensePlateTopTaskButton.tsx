import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingChooseLicensePlateTopTaskButton = () => {
  const {licensePlate} = useContext(ParkingSessionContext)
  const title = licensePlate
    ? `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
    : 'Kies kenteken'
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
      title={title}
      titleIconName={'chevron-down'}
    />
  )
}
