import {Pressable} from '@/components/ui/buttons/Pressable'
import {Badge} from '@/components/ui/feedback/Badge'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingPlannedSessionsSummary = () => {
  const {navigate} = useNavigation()
  const {plannedParkingSessions, isLoading} = useGetParkingSessions()

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsPlannedPleaseWait" />
  }

  if (!plannedParkingSessions?.length) {
    return (
      <Column gutter="sm">
        <Title
          level="h5"
          testID="ParkingPermitSessionsPlannedTitle"
          text="Gepland"
        />
        <Phrase testID="ParkingPermitSessionsPlannedNoPlannedPhrase">
          Er zijn geen geplande parkeersessies.
        </Phrase>
      </Column>
    )
  }

  return (
    <Pressable
      accessibilityLabel={`${plannedParkingSessions.length} geplande parkeersessies`}
      onPress={() => navigate(ParkingRouteName.parkingPlannedSessions)}
      testID="ParkingPermitSessionsPlannedBadgePressable">
      <Row gutter="sm">
        <Title
          color="link"
          level="h5"
          testID="ParkingPermitSessionsPlannedTitle"
          text="Gepland"
        />
        <Badge
          color="info"
          testID="ParkingPermitSessionsPlannedBadge"
          value={plannedParkingSessions.length}
        />
      </Row>
    </Pressable>
  )
}
