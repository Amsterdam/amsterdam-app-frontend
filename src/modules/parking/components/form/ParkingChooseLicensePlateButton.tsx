import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingChooseLicensePlateButton = () => {
  const {licensePlate} = useContext(ParkingSessionContext)
  const title = licensePlate
    ? `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
    : 'Kies kenteken'
  const {toggle} = useBottomSheet()
  const {currentPermitName} = useCurrentParkingPermitName()

  if (!currentPermitName) {
    return (
      <SomethingWentWrong testID="ParkingChooseLicensePlateButtonSomethingWentWrong" />
    )
  }

  return (
    <TopTaskButton
      border
      iconName="parkingCar"
      iconRightName="chevron-down"
      onPress={() => {
        toggle(ParkingSessionBottomSheetVariant.licensePlate)
      }}
      testID="ParkingChooseLicensePlateButton"
      title={title}
    />
  )
}
