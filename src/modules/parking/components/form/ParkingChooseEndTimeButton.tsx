import {useFormContext} from 'react-hook-form'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseEndTimeButton = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  const {no_endtime = false} = currentPermit || {}

  const {watch} = useFormContext<{endTime?: Dayjs; startTime: Dayjs}>()
  const startTime = watch('startTime')

  if (no_endtime) {
    return null
  }

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionEndTimeBottomSheetContentPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionEndTimeBottomSheetContentSomethingWentWrong" />
    )
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
