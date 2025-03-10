import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingStartSessionButton = () => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="parkingSession"
      label="Start parkeersessie"
      onPress={() => {
        navigate(ParkingRouteName.startSession)
      }}
      testID="ParkingStartSessionButton"
    />
  )
}
