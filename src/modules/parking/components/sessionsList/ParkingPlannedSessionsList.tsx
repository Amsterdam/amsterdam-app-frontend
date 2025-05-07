import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <Title
    level="h3"
    testID="ParkingPlannedSessionsNotActiveTitle"
    text="U heeft geen geplande parkeersessie."
    textAlign="center"
  />
)

export const ParkingPlannedSessionsList = () => {
  const {parkingSessions: plannedParkingSessions, isLoading} =
    useGetParkingSessions(ParkingSessionStatus.planned)

  if (isLoading) {
    return <PleaseWait testID="ParkingPlannedSessionsListPleaseWait" />
  }

  return (
    <Box>
      <ParkingSessionsList
        ListEmptyComponent={ListEmptyComponent}
        parkingSessions={plannedParkingSessions}
        sortAscending
      />
    </Box>
  )
}
