import {SectionList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {getWasteCalendarListSections} from '@/modules/waste-guide/utils/getWasteCalendarListSections'
import {capitalizeString} from '@/utils/capitalizeString'

type Props = {
  calendar: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarListView = ({calendar}: Props) => {
  const {sectionList, eventsToday} = getWasteCalendarListSections(calendar)

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
            <Column gutter="md">
              <Phrase emphasis="strong">
                {capitalizeString(item.eventDate.format('dddd D MMMM'))}
                {item.isToday ? ' (vandaag)' : ''}
              </Phrase>
              <Column gutter="lg">
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
          <Title
            accessibilityLabel={`Ophaaldagen voor ${title}`}
            level="h2"
            text={title.charAt(0).toUpperCase() + title.slice(1)}
          />
        )}
        sections={sectionList}
        SectionSeparatorComponent={SectionSeparatorComponent}
        stickySectionHeadersEnabled={false}
      />
    </>
  )
}

const SectionSeparatorComponent = () => <Gutter height="lg" />
