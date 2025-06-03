import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = {
  defaultStartTime: string
}

export const ParkingSessionDetailsVisitorExtendButton = ({
  defaultStartTime,
}: Props) => {
  const {navigate} = useNavigation()
  const onPress = useCallback(() => {
    navigate(ParkingRouteName.startSession, {
      defaultStartTime,
    })
  }, [navigate, defaultStartTime])

  return (
    <Button
      label="Verleng parkeersessie"
      onPress={onPress}
      testID="ParkingSessionDetailsVisitorExtendButton"
      variant="secondary"
    />
  )
}
