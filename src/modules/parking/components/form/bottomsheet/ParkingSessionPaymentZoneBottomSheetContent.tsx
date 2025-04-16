import {useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSessionPaymentZoneBottomSheetContent = () => {
  const {paymentZoneId, setPaymentZoneId, startTime} = useContext(
    ParkingSessionContext,
  )
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()
  const {close} = useBottomSheet()

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionPaymentZoneBottomSheetContentPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionPaymentZoneBottomSheetContentSomethingWentWrong" />
    )
  }

  const {payment_zones} = currentPermit
  const startTimeDayOfWeek = startTime.day()
  const options = payment_zones.map(zone => ({
    label:
      getPaymentZoneDayTimeSpan(getPaymentZoneDay(zone, startTimeDayOfWeek)) ??
      '-',
    value: zone.id,
  }))

  return (
    <Box grow>
      <Column gutter="md">
        <Title
          level="h5"
          text="Wat is de betaald parkeertijd waar de auto staat?"
        />
        <RadioGroup
          onChange={setPaymentZoneId}
          options={options}
          testID="ParkingSessionPaymentZone"
          value={paymentZoneId}
        />
        <Gutter />
        <Button
          label="Gereed"
          onPress={close}
          testID="ParkingSessionPaymentZoneBottomSheetContentDoneButton"
        />
      </Column>
    </Box>
  )
}
