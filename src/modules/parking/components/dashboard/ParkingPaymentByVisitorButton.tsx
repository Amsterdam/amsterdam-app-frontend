import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPaymentByVisitorButton = () => {
  const currentPermit = useCurrentParkingPermit()

  const accountType = useSelector(selectCurrentAccountType)
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    navigate(ParkingRouteName.manageVisitor)
  }, [navigate])

  return currentPermit.visitor_account_allowed &&
    accountType === ParkingPermitScope.permitHolder ? (
    <Button
      label="Bezoeker laten betalen"
      onPress={onPress}
      testID="ParkingPaymentByVisitorButton"
      variant="secondary"
    />
  ) : null
}
