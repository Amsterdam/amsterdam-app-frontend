import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'

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
      label="Eindtijd aanpassen"
      onPress={onPressAdjustEndTime}
      testID="ParkingSessionDetailsAdjustEndTimeButton"
      variant="secondary"
    />
  )
}
