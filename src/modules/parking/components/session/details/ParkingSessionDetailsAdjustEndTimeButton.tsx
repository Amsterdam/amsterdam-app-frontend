import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingSessionDetailsAdjustEndTimeButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()
  const onPressAdjustEndTime = useCallback(() => {
    navigate(ParkingRouteName.editSession, {parkingSession})
  }, [navigate, parkingSession])

  return (
    <Button
      label={
        dayjs(parkingSession.start_date_time).isAfter(dayjs())
          ? 'Aanpassen'
          : 'Eindtijd aanpassen'
      }
      onPress={onPressAdjustEndTime}
      testID="ParkingSessionDetailsAdjustEndTimeButton"
      variant="secondary"
    />
  )
}
