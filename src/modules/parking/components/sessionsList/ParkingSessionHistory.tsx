import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionHistoryList} from '@/modules/parking/components/sessionsList/ParkingSessionHistoryList'

const ListEmptyComponent = () => (
  <Box>
    <Title
      level="h3"
      testID="ParkingSessionTransactionsNoSessionsTitle"
      text="U heeft geen parkeerhistorie."
      textAlign="center"
    />
  </Box>
)

export const ParkingSessionHistory = () => (
  <ParkingSessionHistoryList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending={false}
  />
)
