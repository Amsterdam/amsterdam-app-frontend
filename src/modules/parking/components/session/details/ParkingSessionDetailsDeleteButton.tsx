import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useDeleteSessionMutation} from '@/modules/parking/service'
import {ParkingSession, SecureParkingAccount} from '@/modules/parking/types'

type Props = {
  goBack: () => void
  parkingSession: ParkingSession
  secureParkingAccount?: SecureParkingAccount
}

export const ParkingSessionDetailsDeleteButton = ({
  goBack,
  parkingSession,
  secureParkingAccount,
}: Props) => {
  const [deleteSession] = useDeleteSessionMutation()

  const onPressDelete = useCallback(() => {
    Alert.alert(
      'Weet u zeker dat u deze geplande parkeersessie wilt verwijderen?',
      'Deze actie kan niet ongedaan worden gemaakt.',
      [
        {text: 'Annuleren', style: 'cancel', onPress: () => null},
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => {
            if (secureParkingAccount) {
              void deleteSession({
                accessToken: secureParkingAccount.accessToken,
                ps_right_id: parkingSession.ps_right_id,
                end_date_time: parkingSession.end_date_time,
                start_date_time: parkingSession.start_date_time,
                report_code: parkingSession.report_code,
              })
                .unwrap()
                .then(() => {
                  goBack()
                })
            }
          },
        },
      ],
      {cancelable: true},
    )
  }, [deleteSession, goBack, parkingSession, secureParkingAccount])

  return (
    <Button
      label="Verwijderen"
      onPress={onPressDelete}
      testID="ParkingSessionDetailsDeleteButton"
      variant="secondaryDestructive"
    />
  )
}
