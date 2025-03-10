import {Screen} from '@/components/features/screen/Screen'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {ParkingPermitBalance} from '@/modules/parking/components/ParkingPermitBalance'
import {ParkingPermitDetail} from '@/modules/parking/components/ParkingPermitDetail'
import {ParkingPermitSessions} from '@/modules/parking/components/ParkingPermitSessions'
import {ParkingPermitTopTaskButton} from '@/modules/parking/components/ParkingPermitTopTaskButton'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/buttons/ParkingDashboardNavigationButtons'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/buttons/ParkingPaymentByVisitorButton'
import {ParkingStartSessionButton} from '@/modules/parking/components/buttons/ParkingStartSessionButton'
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
      <BackgroundColorArea
        color="primary"
        height={240}
      />
      <Box>
        <Column gutter="xl">
          <ParkingPermitTopTaskButton />
          <ParkingPermitSessions />
          <Column gutter="md">
            <ParkingStartSessionButton />
            <ParkingPaymentByVisitorButton />
          </Column>
          <ParkingDashboardNavigationButtons />
          <ParkingPermitBalance />
          <ParkingPermitDetail />
        </Column>
      </Box>
    </Screen>
  )
}
