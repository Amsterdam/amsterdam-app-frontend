import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitDetailPermitZone} from '@/modules/parking/components/dashboard/ParkingPermitDetailPermitZone'
import {ParkingPermitDetailTimeBalance} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeBalance'
import {ParkingPermitDetailTimeFrame} from '@/modules/parking/components/dashboard/ParkingPermitDetailTimeFrame'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitDetail = () => {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text={
          parkingAccount?.scope === ParkingPermitScope.visitor
            ? 'Vergunning'
            : 'Uw vergunning'
        }
      />
      <ParkingPermitDetailTimeBalance permit={currentPermit} />
      <ParkingPermitDetailPermitZone permit={currentPermit} />
      <ParkingPermitDetailTimeFrame permit={currentPermit} />
    </Column>
  )
}
