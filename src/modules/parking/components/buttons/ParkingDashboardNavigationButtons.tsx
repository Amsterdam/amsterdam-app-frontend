import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'

export const ParkingDashboardNavigationButtons = () => {
  const {currentPermit} = useGetCurrentPermit()

  return (
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
      {currentPermit?.money_balance_applicable && (
        <NavigationButton
          label="Betalingen"
          onPress={() => {
            //TODO: navigate to payment history
          }}
          testID="ParkingNavigationButtonPaymentHistory"
        />
      )}
    </Column>
  )
}
