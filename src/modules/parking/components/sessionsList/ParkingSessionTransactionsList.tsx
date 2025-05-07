import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <Title
    level="h3"
    testID="ParkingSessionTransactionsNoSessionsTitle"
    text="U heeft geen parkeerhistorie."
    textAlign="center"
  />
)

export const ParkingSessionTransactionsList = () => (
  <Box>
    <ParkingSessionsList
      ListEmptyComponent={ListEmptyComponent}
      sortAscending={false}
      status={ParkingSessionStatus.completed}
    />
  </Box>
)
