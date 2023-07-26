import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const PrivacyInfo = () => (
  <Box>
    <Column gutter="md">
      <Title
        testID="AddressPrivacyInfoTitle"
        text="Hoe gebruiken we uw adres en locatie?"
      />
      <Paragraph variant="intro">
        Met uw locatie kunnen we betere informatie geven. Zoals wanneer we afval
        komen ophalen, of er werkzaamheden in uw buurt zijn, en welk stadsloket
        dichtbij is.
      </Paragraph>
      <Paragraph>
        De app gebruikt uw adres en locatie alleen om gegevens op te halen. Het
        adres wordt op uw toestel opgeslagen. Uw locatie bewaren we helemaal
        niet.
      </Paragraph>
      <Paragraph>
        We verwijderen uw adres zodra u dat aangeeft. Uw toestemming voor het
        gebruiken van uw locatie kunt u altijd intrekken.
      </Paragraph>
    </Column>
  </Box>
)
