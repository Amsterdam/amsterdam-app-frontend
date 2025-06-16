import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  if (parkingAccount?.scope !== ParkingPermitScope.permitHolder) {
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
