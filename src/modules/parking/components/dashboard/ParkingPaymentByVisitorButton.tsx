import {Button} from '@/components/ui/buttons/Button'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingPaymentByVisitorButton = () => {
  const currentPermit = useCurrentParkingPermit()

  return currentPermit.visitor_account_allowed ? (
    <Button
      label="Bezoeker laten betalen"
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
