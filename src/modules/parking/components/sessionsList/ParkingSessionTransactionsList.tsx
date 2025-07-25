import {Box} from '@/components/ui/containers/Box'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingSessionStatus} from '@/modules/parking/types'

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

export const ParkingSessionTransactionsList = () => {
  const currentPermit = useCurrentParkingPermit()

  return (
    <ParkingSessionsList
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={
        currentPermit.visitor_account_allowed ? ListHeaderComponent : undefined
      }
      sortAscending={false}
      status={ParkingSessionStatus.completed}
    />
  )
}
