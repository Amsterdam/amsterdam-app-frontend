import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionChooseTime = () => {
  const currentPermit = useCurrentParkingPermit()

  if (currentPermit.no_endtime) {
    return null
  }

  return (
    <Column gutter="sm">
      <Title
        level="h2"
        testID="ParkingChooseTimeTitle"
        text="Parkeertijd"
      />
      <ParkingChooseStartTimeButton />
      <ParkingChooseEndTimeButton />
      <ParkingChoosePaymentZone />
      <Gutter height="md" />
    </Column>
  )
}
