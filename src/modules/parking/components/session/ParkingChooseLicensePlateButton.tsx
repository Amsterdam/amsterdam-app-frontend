import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingChooseLicensePlateButton = () => {
  const {licensePlate, setBottomSheetVariant} = useContext(
    ParkingSessionContext,
  )
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
        setBottomSheetVariant(ParkingSessionBottomSheetVariant.licensePlate)
        toggle()
      }}
      testID="ParkingChooseLicensePlateButton"
      title={title}
    />
  )
}
