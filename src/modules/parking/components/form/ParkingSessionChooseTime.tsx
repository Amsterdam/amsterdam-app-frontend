import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionChooseTime = () => {
  const currentPermit = useCurrentParkingPermit()
  const hasPaymentZoneId = currentPermit.payment_zones[0]?.id

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
      {!!hasPaymentZoneId && <ParkingChoosePaymentZone />}
    </Column>
  )
}
