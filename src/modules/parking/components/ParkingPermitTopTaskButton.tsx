import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {useCurrentParkingPermitReportCode} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingPermitTopTaskButton = () => {
  const {toggle} = useBottomSheet()
  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const parkingAccount = useParkingAccount()
  const {permit_name, report_code, permit_zone} = useCurrentParkingPermit()

  if (!currentPermitReportCode) {
    return (
      <SomethingWentWrong testID="ParkingPermitTopTaskButtonSomethingWentWrong" />
    )
  }

  return (
    <TopTaskButton
      iconName={
        parkingAccount?.scope === ParkingPermitScope.visitor
          ? 'person'
          : 'documentCheckmark'
      }
      iconSize="lg"
      onPress={() => toggle()}
      testID="ParkingPermitTopTaskButton"
      title={
        parkingAccount?.scope === ParkingPermitScope.visitor
          ? `Op bezoek ${permit_zone.name} - ${report_code}`
          : permit_name
      }
      titleIconName="chevron-down"
    />
  )
}
