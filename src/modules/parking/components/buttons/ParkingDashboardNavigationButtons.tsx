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
