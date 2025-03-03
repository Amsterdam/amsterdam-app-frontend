import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'

export const ParkingPermitSessions = () => (
  <Box distinct>
    <Column gutter="lg">
      <Title
        level="h2"
        testID="ParkingPermitSessionsTitle"
        text="Parkeersessies"
      />
      <Column gutter="sm">
        <Phrase
          emphasis="strong"
          testID="ParkingPermitSessionsActiveTitle">
          Nu actief
        </Phrase>
        <Phrase testID="ParkingPermitSessionsActiveNotActivePhrase">
          Er zijn geen actieve parkeersessies.
        </Phrase>
      </Column>
      <Column gutter="sm">
        <Phrase
          emphasis="strong"
          testID="ParkingPermitSessionsPlannedTitle">
          Gepland
        </Phrase>
        <Phrase testID="ParkingPermitSessionsPlannedNoPlannedPhrase">
          Er zijn geen geplande parkeersessies.
        </Phrase>
      </Column>
    </Column>
  </Box>
)
