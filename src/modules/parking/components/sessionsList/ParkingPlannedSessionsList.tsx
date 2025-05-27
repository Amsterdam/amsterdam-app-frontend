import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionsListVisitor} from '@/modules/parking/components/sessionsList/ParkingSessionsListVisitor'
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

type Props = {
  visitorVehicleId?: string
}

export const ParkingPlannedSessionsList = ({visitorVehicleId}: Props) => {
  const Component = visitorVehicleId
    ? ParkingSessionsListVisitor
    : ParkingSessionsList

  return (
    <Component
      ListEmptyComponent={ListEmptyComponent}
      sortAscending
      status={ParkingSessionStatus.planned}
      visitorVehicleId={visitorVehicleId}
    />
  )
}
