import {useContext, useEffect, useMemo} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
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
    if (allPaymentZonesAreEqual && currentPermit) {
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

  return (
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
  )
}
