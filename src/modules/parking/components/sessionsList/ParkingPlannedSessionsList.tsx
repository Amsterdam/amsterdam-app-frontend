import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <Box>
    <Title
      level="h3"
      testID="ParkingPlannedSessionsNoSessionsTitle"
      text="U heeft geen geplande parkeersessie."
      textAlign="center"
    />
  </Box>
)

export const ParkingPlannedSessionsList = () => (
  <ParkingSessionsList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending
    status={ParkingSessionStatus.planned}
  />
)
