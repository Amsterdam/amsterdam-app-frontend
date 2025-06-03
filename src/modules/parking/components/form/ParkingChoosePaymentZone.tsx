import {useEffect, useMemo} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingTimesAdjustedMessage} from '@/modules/parking/components/session/ParkingTimesAdjustedMessage'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  areAllPaymentZonesEqual,
  getPaymentZone,
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {type Dayjs} from '@/utils/datetime/dayjs'
import {parseTimeToDayjs} from '@/utils/datetime/parseTimeToDayjs'

type FieldValues = {
  endTime?: Dayjs
  paymentZoneId?: string
  startTime: Dayjs
}

export const ParkingChoosePaymentZone = () => {
  const {watch} = useFormContext<FieldValues>()
  const startTime = watch('startTime')
  const endTime = watch('endTime')
  const {
    field: {value: paymentZoneId, onChange},
  } = useController<FieldValues, 'paymentZoneId'>({
    name: 'paymentZoneId',
    rules: {
      required: 'Kies tijden voor betaald parkeren',
    },
  })
  const currentPermit = useCurrentParkingPermit()
  const startTimeDayOfWeek = startTime.day()

  const allPaymentZonesAreEqual = useMemo(
    () =>
      areAllPaymentZonesEqual(currentPermit?.payment_zones, startTimeDayOfWeek),
    [currentPermit, startTimeDayOfWeek],
  )
  const shouldSelectFirstPaymentZone =
    allPaymentZonesAreEqual ||
    (!currentPermit.time_balance_applicable &&
      !currentPermit.money_balance_applicable)

  useEffect(() => {
    // If all payment zones are equal, set the payment zone ID to the first one
    // If the current permit has no time balance or money balance applicable, set the payment zone ID to the first one
    if (shouldSelectFirstPaymentZone) {
      onChange(currentPermit.payment_zones[0].id)
    }
  }, [currentPermit, onChange, shouldSelectFirstPaymentZone])

  const paymentZone = paymentZoneId
    ? getPaymentZone(currentPermit.payment_zones, paymentZoneId)
    : undefined
  const startTimePaymentZoneDay = paymentZone
    ? getPaymentZoneDay(paymentZone, startTimeDayOfWeek)
    : undefined

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  const showTimeIsAdjustedMessage =
    currentPermit.max_session_length_in_days === 1 &&
    paymentZoneId &&
    startTimePaymentZoneDay &&
    endTime &&
    (endTime?.isAfter(
      parseTimeToDayjs(startTimePaymentZoneDay.end_time, startTime),
    ) ||
      startTime?.isBefore(
        parseTimeToDayjs(startTimePaymentZoneDay.start_time, startTime),
      ))

  if (allPaymentZonesAreEqual) {
    if (currentPermit.max_session_length_in_days === 1 && endTime) {
      return (
        <Column gutter="sm">
          <Gutter height="md" />
          <Title
            level="h5"
            text={`Betaald parkeren van ${timeString}`}
          />
          {!!showTimeIsAdjustedMessage && <ParkingTimesAdjustedMessage />}
        </Column>
      )
    } else {
      return null
    }
  }

  return (
    <Column gutter="sm">
      <Gutter height="md" />
      <Title
        level="h4"
        testID="ParkingChooseTimeTitle"
        text={`Gebied ${currentPermit.permit_zone.name} heeft meerdere tijden voor betaald parkeren`}
      />
      <Gutter />
      <SelectButtonControlled<{paymentZoneId?: string}, 'paymentZoneId'>
        bottomSheetVariant={ParkingSessionBottomSheetVariant.paymentZone}
        iconName="clock"
        name="paymentZoneId"
        testID="ParkingChoosePaymentZoneButton"
        text={timeString}
        title={paymentZoneId ? 'Betaald parkeren' : 'Kies betaald parkeertijd'}
      />
      {!!showTimeIsAdjustedMessage && <ParkingTimesAdjustedMessage />}
    </Column>
  )
}
