import {useCallback, useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useEditSessionMutation} from '@/modules/parking/service'

export const ParkingEditSessionButtons = () => {
  const {startTime, endTime, report_code, ps_right_id} = useContext(
    ParkingSessionContext,
  )
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [editSession] = useEditSessionMutation()

  const navigation = useNavigation()

  const onSubmit = useCallback(() => {
    if (secureParkingAccount && endTime && startTime.isBefore(endTime)) {
      void editSession({
        accessToken: secureParkingAccount.accessToken,
        parking_session: {
          report_code: report_code!,
          ps_right_id: ps_right_id!,
          end_date_time: endTime.toJSON(),
          start_date_time: startTime.toJSON(),
        },
      })
        .unwrap()
        .then(() => {
          navigation.pop(2)
        })
    }
  }, [
    secureParkingAccount,
    startTime,
    endTime,
    editSession,
    report_code,
    ps_right_id,
    navigation,
  ])

  return (
    <Column gutter="md">
      <Button
        label="Bevestig nieuwe eindtijd"
        onPress={onSubmit}
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
