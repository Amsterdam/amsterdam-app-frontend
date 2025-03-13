import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const {currentPermit} = useGetCurrentParkingPermit()

  return (
    <Column gutter="xs">
      <NavigationButton
        onPress={() => {
          //TODO: navigate to parking history
        }}
        testID="ParkingNavigationButtonParkingHistory"
        title="Parkeergeschiedenis"
      />
      <NavigationButton
        onPress={() => {
          navigate(ParkingRouteName.myLicensePlates)
        }}
        testID="ParkingNavigationButtonLicensePlates"
        title="Mijn kentekens"
      />
      {currentPermit?.money_balance_applicable && (
        <NavigationButton
          onPress={() => {
            //TODO: navigate to payment history
          }}
          testID="ParkingNavigationButtonPaymentHistory"
          title="Betalingen"
        />
      )}
    </Column>
  )
}
