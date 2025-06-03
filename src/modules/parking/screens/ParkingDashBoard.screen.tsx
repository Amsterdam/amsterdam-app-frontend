import {useEffect} from 'react'
import {RouteProp, type NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/parking/alerts'
import {DashboardHeaderButton} from '@/modules/parking/components/DashboardHeaderButton'
import {DashboardMenu} from '@/modules/parking/components/DashboardMenu'
import {ParkingPermitTopTaskButton} from '@/modules/parking/components/ParkingPermitTopTaskButton'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/dashboard/ParkingDashboardNavigationButtons'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/dashboard/ParkingPaymentByVisitorButton'
import {ParkingPermitBalance} from '@/modules/parking/components/dashboard/ParkingPermitBalance'
import {ParkingPermitDetail} from '@/modules/parking/components/dashboard/ParkingPermitDetail'
import {ParkingPermitSessions} from '@/modules/parking/components/dashboard/ParkingPermitSessions'
import {ParkingStartSessionButton} from '@/modules/parking/components/dashboard/ParkingStartSessionButton'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {baseApi} from '@/services/baseApi'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ParkingRouteName.dashboard>

export const ParkingDashboardScreen = ({route}: Props) => {
  useHandleDeeplink(route)
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
        testID="ParkingDashboardScreen">
        <DashboardMenu />
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
    </CurrentPermitProvider>
  )
}

const useHandleDeeplink = (route: RouteProp<ParkingRouteName.dashboard>) => {
  const {params} = route
  const {setAlert} = useAlert()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.action === 'increase-balance') {
      if (params.status === 'COMPLETED') {
        setAlert(alerts.increaseBalanceSuccess)
        dispatch(baseApi.util.invalidateTags(['ParkingAccount']))
      } else if (params.status === 'EXPIRED' || params.status === 'CANCELLED') {
        setAlert(alerts.increaseBalanceFailed)
      }
    } else if (params?.action === 'start-session-and-increase-balance') {
      if (params.status === 'COMPLETED') {
        setAlert(alerts.startSessionSuccess)
        dispatch(
          baseApi.util.invalidateTags(['ParkingAccount', 'ParkingSessions']),
        )
      } else if (params.status === 'EXPIRED' || params.status === 'CANCELLED') {
        setAlert(alerts.increaseBalanceFailed)
      }
    }
  }, [dispatch, params, setAlert])
}
