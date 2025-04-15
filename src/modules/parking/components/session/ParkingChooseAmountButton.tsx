import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingChooseAmountButton = () => {
  const {amount, setBottomSheetVariant} = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()

  return (
    <TopTaskButton
      border
      iconName="clock"
      iconRightName="chevron-down"
      onPress={() => {
        setBottomSheetVariant(ParkingSessionBottomSheetVariant.amount)
        toggle()
      }}
      testID="ParkingChooseAmountButton"
      text={amount ? '+ ' + formatNumber(amount, 'EUR') : undefined}
      title={amount ? 'Bedrag' : 'Kies een bedrag'}
    />
  )
}
