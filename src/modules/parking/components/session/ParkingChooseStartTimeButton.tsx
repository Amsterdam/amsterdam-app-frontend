import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => {
  const {startTime, setBottomSheetVariant} = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()
  const {currentPermitName} = useCurrentParkingPermitName()

  if (!currentPermitName) {
    return (
      <SomethingWentWrong testID="ParkingChooseStartTimeButtonSomethingWentWrong" />
    )
  }

  const timeString = formatDateTimeToDisplay(startTime, false)

  return (
    <TopTaskButton
      border
      iconName="clock"
      iconRightName="chevron-down"
      onPress={() => {
        setBottomSheetVariant(ParkingSessionBottomSheetVariant.startTime)
        toggle()
      }}
      testID="ParkingChooseStartTimeButton"
      text={timeString}
      title="Starttijd"
    />
  )
}
