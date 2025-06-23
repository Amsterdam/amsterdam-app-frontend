import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useEditSessionMutation} from '@/modules/parking/service'
import {ParkingSession, ParkingSessionStatus} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingSessionDetailsStopButton = ({parkingSession}: Props) => {
  const {goBack} = useNavigation()
  const [editSession, {isError}] = useEditSessionMutation()

  const onPressStop = useCallback(() => {
    Alert.alert(
      'Weet u zeker dat u deze parkeersessie wilt stoppen?',
      'Deze actie kan niet ongedaan worden gemaakt.',
      [
        {text: 'Annuleren', style: 'cancel', onPress: () => null},
        {
          text: 'Stoppen',
          style: 'destructive',
          onPress: () => {
            void editSession({
              parking_session: {
                ...parkingSession,
                end_date_time:
                  parkingSession.status === ParkingSessionStatus.active
                    ? dayjs().toJSON()
                    : parkingSession.start_date_time,
              },
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
  }, [editSession, goBack, parkingSession])

  return (
    <>
      {!!isError && (
        <SomethingWentWrong testID="ParkingSessionDetailsStopButtonSomethingWentWrong" />
      )}
      <Button
        label="Stoppen"
        onPress={onPressStop}
        testID="ParkingSessionDetailsStopButton"
        variant="secondaryDestructive"
      />
    </>
  )
}
