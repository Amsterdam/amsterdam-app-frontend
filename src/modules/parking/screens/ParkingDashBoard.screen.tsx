import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {ParkingPermitDetail} from '@/modules/parking/components/ParkingPermitDetail'
import {ParkingPermitTopTaskButton} from '@/modules/parking/components/ParkingPermitTopTaskButton'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
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
    <Screen
      bottomSheet={
        <BottomSheet testID="ParkingSelectPermitBottomSheet">
          <ParkingSelectPermit />
        </BottomSheet>
      }
      testID="ParkingDashboardScreen">
      <Column gutter="md">
        <ParkingPermitTopTaskButton />
      </Column>
      <Box>
        <ParkingPermitDetail />
      </Box>
    </Screen>
  )
}
