import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useCurrentParkingAccount,
  useCurrentParkingPermitName,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingPermitTopTaskButton = () => {
  const {toggle} = useBottomSheet()
  const {currentPermitName} = useCurrentParkingPermitName()
  const {currentAccountType} = useCurrentParkingAccount()
  const {report_code, permit_zone} = useCurrentParkingPermit()

  if (!currentPermitName) {
    return (
      <SomethingWentWrong testID="ParkingPermitTopTaskButtonSomethingWentWrong" />
    )
  }

  return (
    <TopTaskButton
      iconName={
        currentAccountType === ParkingPermitScope.visitor
          ? 'person'
          : 'documentCheckmark'
      }
      iconSize="lg"
      onPress={() => toggle()}
      testID="ParkingPermitTopTaskButton"
      title={
        currentAccountType === ParkingPermitScope.visitor
          ? `Op bezoek ${permit_zone.name} - ${report_code}`
          : currentPermitName
      }
      titleIconName="chevron-down"
    />
  )
}
