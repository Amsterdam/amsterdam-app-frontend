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
    <>
      <ParkingChooseStartTimeButton />
      <ParkingChooseEndTimeButton />
      {!!hasPaymentZoneId && <ParkingChoosePaymentZone />}
    </>
  )
}
