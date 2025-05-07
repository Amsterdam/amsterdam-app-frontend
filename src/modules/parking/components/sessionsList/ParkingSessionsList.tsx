import {type FC, useMemo} from 'react'
import {SectionList} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingPlannedSessionNavigationButton} from '@/modules/parking/components/session/ParkingPlannedSessionNavigationButton'
import {ParkingSession} from '@/modules/parking/types'
import {compareParkingSessionsByStartDateTime} from '@/modules/parking/utils/compareParkingSessionsByStartDateTime'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Section = {
  data: ParkingSession[]
  title: string
}

const groupParkingSessionsByDate = (
  parkingSessions: ParkingSession[] | undefined,
  sortAscending: boolean,
) =>
  [...(parkingSessions ?? [])]
    .sort((a, b) =>
      sortAscending
        ? compareParkingSessionsByStartDateTime(a, b)
        : compareParkingSessionsByStartDateTime(b, a),
    )
    .reduce<Section[]>((result, session) => {
      const date = formatDateToDisplay(session.start_date_time, false)
      const section = result.find(s => s.title === date)

      if (section) {
        section.data.push(session)
      } else {
        result.push({title: date, data: [session]})
      }

      return result
    }, [])

type Props = {
  ListEmptyComponent?: FC
  parkingSessions: ParkingSession[] | undefined
  sortAscending?: boolean
}

export const ParkingSessionsList = ({
  parkingSessions,
  ListEmptyComponent,
  sortAscending = false,
}: Props) => {
  const sections = useMemo(
    () => groupParkingSessionsByDate(parkingSessions, sortAscending),
    [parkingSessions, sortAscending],
  )

  return (
    <SectionList
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({item}) => (
        <Box insetTop="md">
          <ParkingPlannedSessionNavigationButton parkingSession={item} />
        </Box>
      )}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Border
          key={section.title}
          top>
          <Box insetTop="md">
            <Phrase
              emphasis="strong"
              testID="ParkingPlannedSessionDatePhrase">
              {section.title}
            </Phrase>
          </Box>
        </Border>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
