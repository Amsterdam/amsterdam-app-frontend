import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingActiveSessionNavigationButton} from '@/modules/parking/components/session/ParkingActiveSessionNavigationButton'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const ParkingActiveSessionsSummary = () => {
  const {
    parkingSessions: activeParkingSessions,
    isLoading,
    isError,
  } = useGetParkingSessions(ParkingSessionStatus.active)

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsActivePleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="ParkingActiveSessionsSummarySomethingWentWrong" />
    )
  }

  return (
    <Column gutter="sm">
      <Title
        level="h5"
        testID="ParkingPermitSessionsActiveTitle"
        text="Nu actief"
      />
      {activeParkingSessions?.length ? (
        activeParkingSessions.map(session => (
          <ParkingActiveSessionNavigationButton
            key={session.vehicle_id}
            parkingSession={session}
          />
        ))
      ) : (
        <Phrase testID="ParkingPermitSessionsActiveNotActivePhrase">
          Er zijn geen actieve parkeersessies.
        </Phrase>
      )}
    </Column>
  )
}
