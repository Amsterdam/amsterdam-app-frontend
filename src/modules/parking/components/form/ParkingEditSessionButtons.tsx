import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useEditSessionMutation} from '@/modules/parking/service'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  endTime?: Dayjs
  licensePlate: {
    vehicle_id: string
    visitor_name?: string
  }
  ps_right_id: number
  report_code: string
  startTime: Dayjs
}

export const ParkingEditSessionButtons = () => {
  const {handleSubmit, formState} = useFormContext<FieldValues>()
  const [editSession] = useEditSessionMutation()

  const navigation = useNavigation()

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      report_code,
      ps_right_id,
      licensePlate: {vehicle_id},
    }: FieldValues) => {
      if (endTime && startTime.isBefore(endTime)) {
        return editSession({
          parking_session: {
            report_code,
            ps_right_id,
            vehicle_id,
            end_date_time: endTime.toJSON(),
            start_date_time: startTime.toJSON(),
          },
        })
          .unwrap()
          .then(() => {
            navigation.pop(2)
          })
      }
    },
    [editSession, navigation],
  )

  return (
    <Column gutter="md">
      <Button
        disabled={formState.isSubmitting}
        label="Bevestig nieuwe eindtijd"
        onPress={handleSubmit(onSubmit)}
        testID="ParkingEditSessionButton"
        variant="primary"
      />
      <Button
        label="Annuleren"
        onPress={navigation.goBack}
        testID="ParkingEditSessionButton"
        variant="secondary"
      />
    </Column>
  )
}
