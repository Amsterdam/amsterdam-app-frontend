import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseEndTimeButton = () => {
  const currentPermit = useCurrentParkingPermit()

  const {no_endtime = false} = currentPermit

  const {watch} = useFormContext<{endTime?: Dayjs; startTime: Dayjs}>()
  const startTime = watch('startTime')

  if (no_endtime) {
    return null
  }

  return (
    <SelectButtonControlled<{endTime?: Dayjs}, 'endTime'>
      bottomSheetVariant={ParkingSessionBottomSheetVariant.endTime}
      iconName="clock"
      name="endTime"
      rules={{
        required: no_endtime ? false : 'Kies een eindtijd',
        validate: endTime =>
          no_endtime ||
          (endTime as Dayjs)?.isAfter(startTime) ||
          'Eindtijd moet na starttijd zijn',
      }}
      testID="ParkingChooseEndTimeButton"
      text={endTime =>
        endTime ? formatDateTimeToDisplay(endTime, false) : undefined
      }
      title={endTime => (endTime ? 'Eindtijd' : 'Kies eindtijd')}
    />
  )
}
