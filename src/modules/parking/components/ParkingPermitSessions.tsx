import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'

export const ParkingPermitSessions = () => (
  <Box distinct>
    <Column gutter="lg">
      <Title
        level="h2"
        testID="ParkingPermitSessionsTitle"
        text="Parkeersessies"
      />
      <ParkingActiveSessionsSummary />
      <ParkingPlannedSessionsSummary />
    </Column>
  </Box>
)
