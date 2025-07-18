import {navigationRef} from '@/app/navigation/navigationRef'
import {type NavigationProps} from '@/app/navigation/types'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Placement} from '@/components/ui/types'
import {DashboardHeaderButton} from '@/modules/parking/components/DashboardHeaderButton'
import {DashboardMenu} from '@/modules/parking/components/DashboardMenu'
import {ParkingInfoSection} from '@/modules/parking/components/ParkingInfoSection'
import {ParkingPermitTopTaskButton} from '@/modules/parking/components/ParkingPermitTopTaskButton'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/dashboard/ParkingDashboardNavigationButtons'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/dashboard/ParkingPaymentByVisitorButton'
import {ParkingPermitBalance} from '@/modules/parking/components/dashboard/ParkingPermitBalance'
import {ParkingPermitDetail} from '@/modules/parking/components/dashboard/ParkingPermitDetail'
import {ParkingPermitSessions} from '@/modules/parking/components/dashboard/ParkingPermitSessions'
import {ParkingStartSessionButton} from '@/modules/parking/components/dashboard/ParkingStartSessionButton'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useHandleDeeplink} from '@/modules/parking/hooks/useHandleDeeplink'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccountIsLoggingOut} from '@/modules/parking/slice'

type Props = NavigationProps<ParkingRouteName.dashboard>

export const ParkingDashboardScreen = ({route}: Props) => {
  useHandleDeeplink(route)
  const {permits, isLoading} = useGetPermits()
  const {headerShown = true} = (navigationRef.current?.getCurrentOptions() ??
    {}) as {headerShown?: boolean}
  const isLoggingOut = useParkingAccountIsLoggingOut()

  if (isLoading || isLoggingOut) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingDashboardScreen">
        <PleaseWait testID="ParkingDashboardScreenPleaseWait" />
      </Screen>
    )
  }

  if (!permits) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingDashboardScreen">
        <SomethingWentWrong testID="ParkingDashboardScreenSomethingWentWrong" />
      </Screen>
    )
  }

  return (
    <CurrentPermitProvider>
      <Screen
        bottomSheet={
          <BottomSheet testID="ParkingSelectPermitBottomSheet">
            <ParkingSelectPermit />
          </BottomSheet>
        }
        hasStickyAlert
        headerOptions={{
          SideComponent: DashboardHeaderButton,
        }}
        stickyHeader={<DashboardMenu />}
        testID="ParkingDashboardScreen">
        <BackgroundColorArea
          color="primary"
          height={240}
        />
        <Box
          insetBottom="md"
          insetHorizontal="md"
          insetTop="lg">
          <Column gutter="lg">
            <ProductTourTipWrapper
              placement={Placement.below}
              testID="ParkingPermitTopTaskButtonTooltip"
              tipSlug={Tip.parkingPermitTopTaskButtonTooltip}>
              <ParkingPermitTopTaskButton />
            </ProductTourTipWrapper>
            <Column gutter="xl">
              <ParkingPermitSessions />
              <Column gutter="md">
                <ParkingStartSessionButton />
                <ParkingPaymentByVisitorButton />
              </Column>
              <ParkingDashboardNavigationButtons />
              <ParkingPermitBalance />
              <ParkingPermitDetail />
            </Column>
            <ParkingInfoSection />
          </Column>
        </Box>
      </Screen>
    </CurrentPermitProvider>
  )
}
