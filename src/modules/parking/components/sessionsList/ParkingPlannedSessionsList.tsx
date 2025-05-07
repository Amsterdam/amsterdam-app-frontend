import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <Title
    level="h3"
    testID="ParkingPlannedSessionsNoSessionsTitle"
    text="U heeft geen geplande parkeersessie."
    textAlign="center"
  />
)

export const ParkingPlannedSessionsList = () => (
  <Box>
    <ParkingSessionsList
      ListEmptyComponent={ListEmptyComponent}
      sortAscending
      status={ParkingSessionStatus.planned}
    />
  </Box>
)
