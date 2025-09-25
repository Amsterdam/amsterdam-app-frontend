import {SectionList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {getWasteCalendarListSections} from '@/modules/waste-guide/utils/getWasteCalendarListSections'

type Props = {
  wasteGuide: WasteGuideResponse
}

export const WasteGuideCalendarListView = ({wasteGuide}: Props) => {
  const {sectionList, eventsToday} = getWasteCalendarListSections(
    wasteGuide.calendar,
  )

  return (
    <>
      {eventsToday.length === 0 && (
        <Box insetBottom="md">
          <Phrase>Er wordt vandaag geen afval opgehaald.</Phrase>
        </Box>
      )}
      <SectionList
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <Box insetBottom="md">
            <Column gutter="xs">
              <Phrase emphasis="strong">
                {item.eventDate.locale('nl').format('dddd D MMMM')}
                {item.isToday ? ' (vandaag)' : ''}
              </Phrase>
              <Column gutter="sm">
                {item.events.map(event => (
                  <Row
                    gutter="sm"
                    key={event.code}
                    valign="center">
                    <WasteFractionIcon fractionCode={event.code} />
                    <Phrase>{event.label}</Phrase>
                  </Row>
                ))}
              </Column>
            </Column>
          </Box>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Box insetBottom="md">
            <Title
              accessibilityLabel={`Ophaaldagen voor ${title}`}
              level="h2"
              text={title.charAt(0).toUpperCase() + title.slice(1)}
            />
          </Box>
        )}
        sections={sectionList}
        stickySectionHeadersEnabled={false}
      />
    </>
  )
}
