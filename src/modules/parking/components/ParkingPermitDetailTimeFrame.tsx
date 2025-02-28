import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {PaymentZone, ParkingPermit} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

const displayPaymentTimeFrame = (paymentZones: PaymentZone[]) =>
  paymentZones.flatMap(zone =>
    zone.days
      .filter(day => day.day_of_week.toLowerCase() === dayjs().format('dddd'))
      .map(day => ({
        key: day.day_of_week,
        phrase: `${day.start_time} tot ${day.end_time}`,
      })),
  )

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
      <Phrase
        emphasis="strong"
        testID="ParkingPermitDetailPaidParkingTitlePhrase">
        Betaald parkeren
      </Phrase>
      {timeFrame.map(({key, phrase}) => (
        <Phrase
          key={key}
          testID="ParkingPermitDetailPaidParkingTimeFramePhrase">
          {phrase} uur
        </Phrase>
      ))}
    </Column>
  )
}
