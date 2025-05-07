import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingPermitSessions = () => {
  const currentPermit = useCurrentParkingPermit()

  return (
    <Box variant="distinct">
      <Column gutter="lg">
        <Title
          level="h2"
          testID="ParkingPermitSessionsTitle"
          text="Parkeersessies"
        />
        <ParkingActiveSessionsSummary />
        {!currentPermit.no_endtime && <ParkingPlannedSessionsSummary />}
      </Column>
    </Box>
  )
}
