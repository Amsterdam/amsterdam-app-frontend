import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {PaymentZone} from '@/modules/parking/types'
import {getDaysForPaymentTimeFrame} from '@/modules/parking/utils/getDaysForPaymentTimeFrame'
import {getFreeParkingDays} from '@/modules/parking/utils/getFreeParkingDays'
import {capitalizeString} from '@/utils/capitalizeString'
import {formatWeekdayNumberToDisplay} from '@/utils/datetime/formatWeekdayNumberToDisplay'

export const ParkingPaymentTimes = ({
  paymentZone,
}: {
  paymentZone: PaymentZone
}) => {
  const days = getDaysForPaymentTimeFrame(paymentZone)
  const freeParkingDays = getFreeParkingDays(paymentZone)

  return (
    <Column>
      {Object.entries(days).map(([timeSpan, daysForTimeSpan]) => (
        <Phrase key={timeSpan}>
          {capitalizeString(formatWeekdayNumberToDisplay(daysForTimeSpan))}:{' '}
          {timeSpan}
        </Phrase>
      ))}
      {freeParkingDays.length > 0 && (
        <Phrase>
          {capitalizeString(formatWeekdayNumberToDisplay(freeParkingDays))}:{' '}
          Gratis parkeren
        </Phrase>
      )}
    </Column>
  )
}
