import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'

export const ParkingPermitSessions = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsPleaseWait" />
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingPermitSessionsSomethingWentWrong" />
    )
  }

  return (
    <Box variant="distinct">
      <Column gutter="lg">
        <Title
          level="h2"
          testID="ParkingPermitSessionsTitle"
          text="Parkeersessies"
        />
        <ParkingActiveSessionsSummary />
        {!currentPermit.no_endtime && <ParkingPlannedSessionsSummary />}
      </Column>
    </Box>
  )
}
