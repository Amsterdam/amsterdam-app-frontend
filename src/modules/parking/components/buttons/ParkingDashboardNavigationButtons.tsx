import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'

export const ParkingDashboardNavigationButtons = () => (
  <Column gutter="xs">
    <NavigationButton
      label="Parkeergeschiedenis"
      onPress={() => {
        //TODO: navigate to parking history
      }}
      testID="ParkingNavigationButtonParkingHistory"
    />
    <NavigationButton
      label="Mijn kentekens"
      onPress={() => {
        //TODO: navigate to license plates
      }}
      testID="ParkingNavigationButtonLicensePlates"
    />
    <NavigationButton
      label="Betalingen"
      onPress={() => {
        //TODO: navigate to payment history
      }}
      testID="ParkingNavigationButtonPaymentHistory"
    />
  </Column>
)
