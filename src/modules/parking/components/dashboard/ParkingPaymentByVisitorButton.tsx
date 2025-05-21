import {Button} from '@/components/ui/buttons/Button'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPaymentByVisitorButton = () => {
  const currentPermit = useCurrentParkingPermit()

  const accountType = useSelector(selectCurrentAccountType)

  return currentPermit.visitor_account_allowed &&
    accountType === ParkingPermitScope.permitHolder ? (
    <Button
      label="Bezoeker laten betalen"
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
