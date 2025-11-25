import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeleteSessionMutation} from '@/modules/parking/service'
import {ParkingSession} from '@/modules/parking/types'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingSessionDetailsDeleteButton = ({parkingSession}: Props) => {
  const [deleteSession, {isLoading, isError}] = useDeleteSessionMutation()
  const {goBack} = useNavigation()

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
            void deleteSession({
              ps_right_id: parkingSession.ps_right_id,
              end_date_time: parkingSession.end_date_time,
              start_date_time: parkingSession.start_date_time,
              report_code: parkingSession.report_code,
              vehicle_id: parkingSession.vehicle_id,
            })
              .unwrap()
              .then(() => {
                goBack()
              })
          },
        },
      ],
      {cancelable: true},
    )
  }, [deleteSession, goBack, parkingSession])

  return (
    <>
      {!!isError && (
        <SomethingWentWrong testID="ParkingSessionDetailsDeleteButtonSomethingWentWrong" />
      )}
      <Button
        isError={isError}
        isLoading={isLoading}
        label="Verwijderen"
        onPress={onPressDelete}
        testID="ParkingSessionDetailsDeleteButton"
        variant="secondaryDestructive"
      />
    </>
  )
}
