import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingPaymentTimes} from '@/modules/parking/components/dashboard/ParkingPaymentTimes'
import {ParkingPermit} from '@/modules/parking/types'
import {areAllPaymentZonesEqual} from '@/modules/parking/utils/paymentZone'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeFrame = ({permit}: Props) => {
  const allPaymentZonesEqual = areAllPaymentZonesEqual(permit.payment_zones)

  if (permit.payment_zones.length === 0) {
    return null
  }

  return (
    <Column gutter="xs">
      <Title
        level="h5"
        testID="ParkingPermitDetailPaidParkingTitlePhrase"
        text="Betaald parkeren"
      />
      <ParkingPaymentTimes paymentZone={permit.payment_zones[0]} />
      {!allPaymentZonesEqual && (
        <Column>
          <Gutter height="lg" />
          <Phrase>In een deel van het gebied zijn andere tijden:</Phrase>
          <ParkingPaymentTimes paymentZone={permit.payment_zones[1]} />
        </Column>
      )}
    </Column>
  )
}
