import {useEffect} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoolean} from '@/hooks/useBoolean'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {ParkingActiveSessionNavigationButton} from '@/modules/parking/components/session/ParkingActiveSessionNavigationButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  visitorVehicleId?: string
}

export const ParkingActiveSessionsSummary = ({visitorVehicleId}: Props) => {
  const {
    parkingSessions: activeParkingSessions,
    isLoading,
    isError,
    refetch,
  } = useGetParkingSessions(ParkingSessionStatus.active, visitorVehicleId)

  const currentPermit = useCurrentParkingPermit()

  // refetch sessions when there are sessions returned without a ps_right_id, because somehow, directly after making them it can occur that they do not have them
  const {value: isRefetched, enable: setRefetched} = useBoolean(false)

  useEffect(() => {
    if (visitorVehicleId) {
      return
    }

    if (
      !isRefetched &&
      activeParkingSessions?.some(session => !session.ps_right_id)
    ) {
      void refetch()
      setRefetched()
    }
  }, [
    activeParkingSessions,
    isRefetched,
    refetch,
    setRefetched,
    visitorVehicleId,
  ])

  // refetch sessions every 15 seconds if there are sessions that are not yet paid, it can take a bit before the payment is processed
  useRefetchInterval(
    refetch,
    activeParkingSessions?.some(
      session => 'is_paid' in session && !session.is_paid,
    )
      ? 15000
      : 0,
  )

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
            key={session.ps_right_id ?? session.vehicle_id}
            noEndTime={currentPermit.no_endtime}
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
