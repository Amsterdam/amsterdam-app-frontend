import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useEditSessionMutation} from '@/modules/parking/service'
import {
  ParkingSession,
  ParkingSessionStatus,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  parkingSession: ParkingSession
  secureParkingAccount?: SecureParkingAccount
}

export const ParkingSessionDetailsStopButton = ({
  parkingSession,
  secureParkingAccount,
}: Props) => {
  const {goBack} = useNavigation()
  const [editSession] = useEditSessionMutation()

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
            if (secureParkingAccount) {
              void editSession({
                accessToken: secureParkingAccount.accessToken,
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
            }
          },
        },
      ],
      {cancelable: true},
    )
  }, [editSession, goBack, parkingSession, secureParkingAccount])

  return (
    <Button
      label="Stoppen"
      onPress={onPressStop}
      testID="ParkingSessionDetailsStopButton"
      variant="secondaryDestructive"
    />
  )
}
