import {Screen} from '@/components/features/screen/Screen'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingPlannedSessionNavigationButton} from '@/modules/parking/components/session/ParkingPlannedSessionNavigationButton'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const ParkingPlannedSessionsScreen = () => {
  const {parkingSessions: plannedParkingSessions, isLoading} =
    useGetParkingSessions(ParkingSessionStatus.planned)

  if (isLoading) {
    return <PleaseWait testID="ParkingPlannedSessionsPleaseWait" />
  }

  return (
    <Screen testID="ParkingPlannedSessionsScreen">
      <Box>
        {plannedParkingSessions?.length ? (
          plannedParkingSessions.map(session => (
            <Border
              key={session.created_time}
              top>
              <Box insetTop="md">
                <ParkingPlannedSessionNavigationButton
                  parkingSession={session}
                />
              </Box>
            </Border>
          ))
        ) : (
          <Phrase testID="ParkingPlannedSessionsNotActivePhrase">
            U heeft geen geplande parkeersessie.
          </Phrase>
        )}
      </Box>
    </Screen>
  )
}
