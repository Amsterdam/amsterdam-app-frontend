import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <Title
    level="h3"
    testID="ParkingSessionTransactionsNoSessionsTitle"
    text="U heeft geen parkeerhistorie."
    textAlign="center"
  />
)

export const ParkingSessionTransactionsList = () => {
  const {parkingSessions: plannedParkingSessions, isLoading} =
    useGetParkingSessions(ParkingSessionStatus.completed)

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionTransactionsListPleaseWait" />
  }

  return (
    <Box>
      <ParkingSessionsList
        ListEmptyComponent={ListEmptyComponent}
        parkingSessions={plannedParkingSessions}
        sortAscending={false}
      />
    </Box>
  )
}
