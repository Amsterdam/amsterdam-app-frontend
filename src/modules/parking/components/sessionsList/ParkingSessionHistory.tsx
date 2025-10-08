import {Box} from '@/components/ui/containers/Box'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionHistoryList} from '@/modules/parking/components/sessionsList/ParkingSessionHistoryList'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

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

const ListHeaderComponent = () => (
  <Box>
    <Paragraph>
      U ziet alleen de parkeersessies die u zelf heeft gestart.
    </Paragraph>
  </Box>
)

export const ParkingSessionHistory = () => {
  const currentPermit = useCurrentParkingPermit()

  return (
    <ParkingSessionHistoryList
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={
        currentPermit.visitor_account_allowed ? ListHeaderComponent : undefined
      }
      sortAscending={false}
    />
  )
}
