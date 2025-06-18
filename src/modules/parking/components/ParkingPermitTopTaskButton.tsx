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

  const title =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? `Op bezoek ${permit_zone.name} - ${report_code}`
      : permit_name

  return (
    <TopTaskButton
      accessibilityHint="Tik om een andere vergunning te selecteren."
      accessibilityLabel={`De huidige vergunning is ${title}.`}
      iconName={
        parkingAccount?.scope === ParkingPermitScope.visitor
          ? 'person'
          : 'documentCheckmark'
      }
      iconSize="lg"
      onPress={() => toggle()}
      testID="ParkingPermitTopTaskButton"
      title={title}
      titleIconName="chevron-down"
    />
  )
}
