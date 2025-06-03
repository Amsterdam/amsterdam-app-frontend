import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = {
  endTimeAsStartTime: string
}

export const ParkingSessionDetailsVisitorExtendButton = ({
  endTimeAsStartTime,
}: Props) => {
  const {navigate} = useNavigation()
  const onPress = useCallback(() => {
    navigate(ParkingRouteName.startSession, {
      endTimeAsStartTime,
    })
  }, [navigate, endTimeAsStartTime])

  return (
    <Button
      label="Verleng parkeersessie"
      onPress={onPress}
      testID="ParkingSessionDetailsVisitorExtendButton"
      variant="secondary"
    />
  )
}
