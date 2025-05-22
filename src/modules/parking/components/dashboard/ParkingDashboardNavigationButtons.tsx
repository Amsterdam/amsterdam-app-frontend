import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const accountType = useSelector(selectCurrentAccountType)

  if (accountType !== ParkingPermitScope.permitHolder) {
    return null
  }

  return (
    <Column gutter="xs">
      <NavigationButton
        onPress={() => {
          navigate(ParkingRouteName.parkingSessionTransactions)
        }}
        testID="ParkingParkingHistoryButton"
        title="Parkeergeschiedenis"
      />
      <NavigationButton
        onPress={() => {
          navigate(ParkingRouteName.myLicensePlates)
        }}
        testID="ParkingLicensePlatesButton"
        title="Mijn kentekens"
      />
      {!!currentPermit.money_balance_applicable && (
        <NavigationButton
          onPress={() => {
            navigate(ParkingRouteName.parkingMoneyTransactions)
          }}
          testID="ParkingPaymentHistoryButton"
          title="Betalingen"
        />
      )}
    </Column>
  )
}
