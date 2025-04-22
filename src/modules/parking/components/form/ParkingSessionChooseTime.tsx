import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'

export const ParkingSessionChooseTime = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionChooseTimePleaseWait" />
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionChooseTimeSomethingWentWrong" />
    )
  }

  if (currentPermit.no_endtime) {
    return null
  }

  return (
    <Column gutter="sm">
      <Title
        level="h2"
        testID="ParkingChooseTimeTitle"
        text="Parkeertijd"
      />
      <ParkingChooseStartTimeButton />
      <ParkingChooseEndTimeButton />
      <ParkingChoosePaymentZone />
      <Gutter height="md" />
    </Column>
  )
}
