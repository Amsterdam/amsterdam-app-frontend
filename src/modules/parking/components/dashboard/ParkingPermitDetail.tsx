import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {ParkingPermitDetailPermitZone} from '@/modules/parking/components/dashboard/ParkingPermitDetailPermitZone'
import {ParkingPermitDetailTimeBalance} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeBalance'
import {ParkingPermitDetailTimeFrame} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeFrame'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitDetail = () => {
  const currentPermit = useCurrentParkingPermit()
  const accountType = useSelector(selectCurrentAccountType)

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text={
          accountType === ParkingPermitScope.permitHolder
            ? 'Uw vergunning'
            : 'Vergunning'
        }
      />
      <ParkingPermitDetailTimeBalance permit={currentPermit} />
      <ParkingPermitDetailPermitZone permit={currentPermit} />
      <ParkingPermitDetailTimeFrame permit={currentPermit} />
    </Column>
  )
}
