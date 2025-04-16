import {useContext, useEffect, useMemo} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingTimesAdjustedMessage} from '@/modules/parking/components/session/ParkingTimesAdjustedMessage'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {
  areAllPaymentZonesEqual,
  getPaymentZone,
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {parseTimeToDayjs} from '@/utils/datetime/parseTimeToDayjs'

export const ParkingChoosePaymentZone = () => {
  const {
    paymentZoneId,
    startTime,
    setPaymentZoneId,
    setBottomSheetVariant,
    endTime,
  } = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()
  const startTimeDayOfWeek = startTime.day()

  const allPaymentZonesAreEqual = useMemo(
    () =>
      currentPermit
        ? areAllPaymentZonesEqual(
            currentPermit?.payment_zones,
            startTimeDayOfWeek,
          )
        : false,
    [currentPermit, startTimeDayOfWeek],
  )

  useEffect(() => {
    // If all payment zones are equal, set the payment zone ID to the first one
    // If the current permit has no time balance or money balance applicable, set the payment zone ID to the first one
    if (
      currentPermit &&
      (allPaymentZonesAreEqual ||
        (!currentPermit.time_balance_applicable &&
          !currentPermit.money_balance_applicable))
    ) {
      setPaymentZoneId(currentPermit.payment_zones[0].id)
    }
  }, [currentPermit, allPaymentZonesAreEqual, setPaymentZoneId])

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionLicensePlateBottomSheetPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionLicensePlateBottomSheetSomethingWentWrong" />
    )
  }

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
    currentPermit?.max_session_length_in_days === 1 &&
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
        level="h5"
        testID="ParkingChooseTimeTitle"
        text={`Gebied ${currentPermit.permit_zone.name} heeft meerdere tijden voor betaald parkeren`}
      />
      <Gutter />
      <TopTaskButton
        border
        iconName="clock"
        iconRightName="chevron-down"
        onPress={() => {
          setBottomSheetVariant(ParkingSessionBottomSheetVariant.paymentZone)
          toggle()
        }}
        testID="ParkingChooseEndTimeButton"
        text={timeString}
        title={paymentZoneId ? 'Betaald parkeren' : 'Kies betaald parkeertijd'}
      />
      {!!showTimeIsAdjustedMessage && <ParkingTimesAdjustedMessage />}
    </Column>
  )
}
