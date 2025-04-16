import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingChooseAmountButton = () => {
  const {amount} = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()

  return (
    <TopTaskButton
      border
      iconName="clock"
      iconRightName="chevron-down"
      onPress={() => {
        toggle(ParkingSessionBottomSheetVariant.amount)
      }}
      testID="ParkingChooseAmountButton"
      text={amount ? '+ ' + formatNumber(amount, 'EUR') : undefined}
      title={amount ? 'Bedrag' : 'Kies een bedrag'}
    />
  )
}
