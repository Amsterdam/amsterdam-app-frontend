import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionsListVisitor} from '@/modules/parking/components/sessionsList/ParkingSessionsListVisitor'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, ParkingSessionStatus} from '@/modules/parking/types'

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

export const ParkingPlannedSessionsList = () => {
  const parkingAccount = useParkingAccount()
  const Component =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? ParkingSessionsListVisitor
      : ParkingSessionsList

  return (
    <Component
      ListEmptyComponent={ListEmptyComponent}
      sortAscending
      status={ParkingSessionStatus.planned}
    />
  )
}
