import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => {
  const {startTime, setBottomSheetVariant} = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()

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
