import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'

export const ParkingDashboardScreen = () => {
  const {permits, isLoading} = useGetPermits()

  if (isLoading) {
    return <PleaseWait testID="ParkingDashboardScreenPleaseWait" />
  }

  if (!permits) {
    return (
      <SomethingWentWrong testID="ParkingDashboardScreenSomethingWentWrong" />
    )
  }

  return (
    <Screen testID="ParkingDashboardScreen">
      <Box>
        <Title
          level="h2"
          text={permits[0].permit_name}
        />
      </Box>
    </Screen>
  )
}
