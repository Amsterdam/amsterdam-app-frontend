import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingStartSessionButton = () => {
  const {navigate} = useNavigation()

  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsPleaseWait" />
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingPermitSessionsSomethingWentWrong" />
    )
  }

  return (
    <Button
      iconName="parkingSession"
      label={
        currentPermit.no_endtime ? 'Wijzig kenteken' : 'Start parkeersessie'
      }
      onPress={() => {
        navigate(ParkingRouteName.startSession)
      }}
      testID="ParkingStartSessionButton"
    />
  )
}
