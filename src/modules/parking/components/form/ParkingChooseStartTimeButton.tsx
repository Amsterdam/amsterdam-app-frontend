import type {Dayjs} from '@/utils/datetime/dayjs'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => (
  <SelectButtonControlled<{startTime: Dayjs}, 'startTime'>
    bottomSheetVariant={ParkingSessionBottomSheetVariant.startTime}
    iconName="clock"
    name="startTime"
    rules={{required: 'Kies een starttijd'}}
    testID="ParkingChooseStartTimeButton"
    text={startTime => formatDateTimeToDisplay(startTime, false)}
    title="Starttijd"
  />
)
