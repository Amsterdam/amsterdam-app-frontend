import {useContext, useEffect, useMemo} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {
  areAllPaymentZonesEqual,
  getPaymentZoneTimeString,
} from '@/modules/parking/utils/paymentZone'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingChoosePaymentZone = () => {
  const {paymentZoneId, startTime, setPaymentZoneId, setBottomSheetVariant} =
    useContext(ParkingSessionContext)
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

  const timeString = paymentZoneId
    ? getPaymentZoneTimeString(
        currentPermit.payment_zones,
        paymentZoneId,
        startTimeDayOfWeek,
      )
    : undefined

  if (allPaymentZonesAreEqual) {
    if (currentPermit.max_session_length_in_days === 1) {
      return <Paragraph>Betaald parkeren van {timeString}.</Paragraph>
    } else {
      return null
    }
  }

  return (
    <Column gutter="sm">
      <Gutter height="md" />
      <Title
        level="h2"
        testID="ParkingChooseTimeTitle"
        text="Begintijd en eindtijd betaald parkeren"
      />
      <TopTaskButton
        border
        iconName="parkingCar"
        iconRightName="chevron-right"
        onPress={() => {
          setBottomSheetVariant(ParkingSessionBottomSheetVariant.paymentZone)
          toggle()
        }}
        testID="ParkingChooseEndTimeButton"
        text={timeString}
        title={
          paymentZoneId ? 'Betaald parkeren' : 'Kies tijden betaald parkeren'
        }
      />
    </Column>
  )
}
