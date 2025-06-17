import {type ComponentType, useCallback, useMemo, useState} from 'react'
import {SectionList, SectionListProps} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {ParkingPlannedSessionNavigationButton} from '@/modules/parking/components/session/ParkingPlannedSessionNavigationButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {parkingApi, useParkingSessionsQuery} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingSession,
  ParkingSessionsEndpointRequest,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {
  ParkingSessionOrDummy,
  Section,
  dummyTitle,
  groupParkingSessionsByDate,
} from '@/modules/parking/utils/groupParkingSessionsByDate'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  sortAscending?: boolean
  status: ParkingSessionStatus
}

const pageSize = 20

export const ParkingSessionsList = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
  status,
}: Props) => {
  const currentPermit = useCurrentParkingPermit()

  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, pageSize)

  const result = useInfiniteScroller<
    ParkingSession,
    ParkingSession,
    ParkingSessionsEndpointRequest
  >(
    {
      start_date_time: sortAscending
        ? '2038-01-01T00:00:00'
        : '1970-01-01T00:00:00',
      ps_right_id: -1,
      dummy: true,
    } as unknown as ParkingSession,
    parkingApi.endpoints[ParkingEndpointName.parkingSessions],
    'ps_right_id',
    useParkingSessionsQuery,
    page,
    pageSize,
    {
      page_size: pageSize,
      report_code: currentPermit.report_code.toString(),
      status,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<ParkingSessionOrDummy, Section>['onViewableItemsChanged']
    >
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems
          .flatMap(section => section.item)
          .filter(item => item.ps_right_id)

        if (items.length === 0) {
          return
        }

        const firstIndex = result.data.findIndex(
          item => item.ps_right_id === items[0]?.ps_right_id,
        )
        const lastIndex = result.data.findIndex(
          item => item.ps_right_id === items[items.length - 1]?.ps_right_id,
        )

        if (firstIndex && lastIndex) {
          setViewableItemIndex(Math.round((firstIndex + lastIndex) / 2))
        }
      }
    },
    [result.data],
  )

  const sections = useMemo(
    () => groupParkingSessionsByDate(result.data, sortAscending),
    [result, sortAscending],
  )

  return (
    <SectionList
      ListEmptyComponent={result.isLoading ? null : ListEmptyComponent}
      ListHeaderComponent={
        currentPermit.no_endtime ? null : ListHeaderComponent
      }
      onViewableItemsChanged={onViewableItemsChanged}
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
