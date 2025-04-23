import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {PaymentZone, ParkingPermit} from '@/modules/parking/types'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {dayjs} from '@/utils/datetime/dayjs'

const displayPaymentTimeFrame = (paymentZones: PaymentZone[]) =>
  paymentZones
    .map(zone => {
      const day = getPaymentZoneDay(zone, dayjs().day())

      if (day) {
        return {
          key: `${zone.id}:${day.day_of_week}`,
          phrase: getPaymentZoneDayTimeSpan(day),
        }
      }

      return undefined
    })
    .filter(day => !!day)

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailTimeFrame = ({permit}: Props) => {
  const timeFrame = permit ? displayPaymentTimeFrame(permit.payment_zones) : []

  if (!timeFrame.length) {
    return null
  }

  return (
    <Column gutter="xs">
      <Title
        level="h5"
        testID="ParkingPermitDetailPaidParkingTitlePhrase"
        text="Betaald parkeren"
      />
      {timeFrame.map(({key, phrase}) => (
        <Phrase
          key={key}
          testID="ParkingPermitDetailPaidParkingTimeFramePhrase">
          {phrase}
        </Phrase>
      ))}
    </Column>
  )
}
