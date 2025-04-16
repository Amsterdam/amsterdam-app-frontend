import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useEditSessionMutation} from '@/modules/parking/service'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  endTime?: Dayjs
  ps_right_id: number
  report_code: string
  startTime: Dayjs
}

export const ParkingEditSessionButtons = () => {
  const {handleSubmit} = useFormContext<FieldValues>()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [editSession] = useEditSessionMutation()

  const navigation = useNavigation()

  const onSubmit = useCallback(
    ({startTime, endTime, report_code, ps_right_id}: FieldValues) => {
      if (secureParkingAccount && endTime && startTime.isBefore(endTime)) {
        void editSession({
          accessToken: secureParkingAccount.accessToken,
          parking_session: {
            report_code,
            ps_right_id,
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
    [secureParkingAccount, editSession, navigation],
  )

  return (
    <Column gutter="md">
      <Button
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
