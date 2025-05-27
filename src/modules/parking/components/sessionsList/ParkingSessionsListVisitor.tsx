import {ComponentType, useMemo} from 'react'
import {SectionList} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingPlannedSessionNavigationButton} from '@/modules/parking/components/session/ParkingPlannedSessionNavigationButton'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'
import {
  dummyTitle,
  groupParkingSessionsByDate,
} from '@/modules/parking/utils/groupParkingSessionsByDate'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  sortAscending?: boolean
  status: ParkingSessionStatus
  visitorVehicleId?: string
}

export const ParkingSessionsListVisitor = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
  visitorVehicleId,
  status,
}: Props) => {
  const {parkingSessions, isLoading} = useGetParkingSessions(
    status,
    visitorVehicleId,
  )
  const sections = useMemo(
    () => groupParkingSessionsByDate(parkingSessions, sortAscending),
    [parkingSessions, sortAscending],
  )

  return (
    <SectionList
      ListEmptyComponent={isLoading ? null : ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({item}) => (
        <Box
          insetHorizontal="md"
          insetTop="md">
          {item.dummy ? (
            <Gutter height="lg" />
          ) : (
            <ParkingPlannedSessionNavigationButton parkingSession={item} />
          )}
        </Box>
      )}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Box insetHorizontal="md">
          <Border
            key={section.title}
            top>
            <Gutter height="md" />
            <Phrase
              emphasis="strong"
              testID="ParkingPlannedSessionDatePhrase">
              {section.title === dummyTitle ? ' ' : section.title}
            </Phrase>
          </Border>
        </Box>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
