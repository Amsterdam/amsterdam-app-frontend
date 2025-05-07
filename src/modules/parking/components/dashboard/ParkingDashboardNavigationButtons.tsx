import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()

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
            //TODO: navigate to payment history
          }}
          testID="ParkingPaymentHistoryButton"
          title="Betalingen"
        />
      )}
    </Column>
  )
}
