import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitDetailPermitZone} from '@/modules/parking/components/ParkingPermitDetailPermitZone'
import {ParkingPermitDetailTimeBalance} from '@/modules/parking/components/ParkingPermitDetailTimeBalance'
import {ParkingPermitDetailTimeFrame} from '@/modules/parking/components/ParkingPermitDetailTimeFrame'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'

export const ParkingPermitDetail = () => {
  const {currentPermit, isLoading} = useGetCurrentPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitDetailPleaseWait" />
  }

  if (!currentPermit) {
    return <SomethingWentWrong testID="ParkingPermitDetailSomethingWentWrong" />
  }

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text="Uw vergunning"
      />
      <ParkingPermitDetailTimeBalance permit={currentPermit} />
      <ParkingPermitDetailPermitZone permit={currentPermit} />
      <ParkingPermitDetailTimeFrame permit={currentPermit} />
    </Column>
  )
}
