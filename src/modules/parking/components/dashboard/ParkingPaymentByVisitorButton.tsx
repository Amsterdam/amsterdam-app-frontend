import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPaymentByVisitorButton = () => {
  const currentPermit = useCurrentParkingPermit()

  const {parkingAccount} = useParkingAccount()
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    navigate(ParkingRouteName.manageVisitor)
  }, [navigate])

  return currentPermit.visitor_account_allowed &&
    parkingAccount?.scope === ParkingPermitScope.permitHolder ? (
    <Button
      label="Bezoeker laten betalen"
      onPress={onPress}
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
