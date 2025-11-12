import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingApiVersion, ParkingPermitScope} from '@/modules/parking/types'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const apiVersion = useCurrentParkingApiVersion()

  return (
    <Column gutter="xs">
      {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
        <>
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
        </>
      )}

      {apiVersion === ParkingApiVersion.v2 && (
        <NavigationButton
          onPress={() => {
            navigate(ParkingRouteName.parkingPermitZones)
          }}
          testID="ParkingPermitZoneButton"
          title="Vergunninggebied"
        />
      )}
    </Column>
  )
}
