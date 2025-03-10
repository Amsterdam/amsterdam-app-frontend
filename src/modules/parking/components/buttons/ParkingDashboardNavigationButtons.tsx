import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
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
          navigate(ParkingRouteName.myLicensePlates)
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
