import {Button} from '@/components/ui/buttons/Button'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'

export const ParkingPaymentByVisitorButton = () => {
  const {currentPermit} = useGetCurrentPermit()

  return currentPermit?.visitor_account_allowed ? (
    <Button
      label="Bezoeker laten betalen"
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
