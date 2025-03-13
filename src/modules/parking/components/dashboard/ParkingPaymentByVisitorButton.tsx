import {Button} from '@/components/ui/buttons/Button'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'

export const ParkingPaymentByVisitorButton = () => {
  const {currentPermit} = useGetCurrentParkingPermit()

  return currentPermit?.visitor_account_allowed ? (
    <Button
      label="Bezoeker laten betalen"
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
