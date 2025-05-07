import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitDetailPermitZone} from '@/modules/parking/components/dashboard/ParkingPermitDetailPermitZone'
import {ParkingPermitDetailTimeBalance} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeBalance'
import {ParkingPermitDetailTimeFrame} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeFrame'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingPermitDetail = () => {
  const currentPermit = useCurrentParkingPermit()

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
