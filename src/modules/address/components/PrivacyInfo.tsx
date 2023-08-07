import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const PrivacyInfo = () => (
  <Box>
    <Column gutter="md">
      <Title
        testID="AddressPrivacyInfoTitle"
        text="Hoe worden mijn locatie en adres gebruikt?"
      />
      <Paragraph variant="intro">
        Met uw locatie en adres kunnen we betere informatie geven. Zoals wanneer
        er afval wordt opgehaald, of er werkzaamheden in uw buurt zijn en welk
        stadsloket dichtbij is.
      </Paragraph>
      <Paragraph>
        De app gebruikt uw adres en locatie alleen om gegevens op te halen. Het
        adres wordt op uw toestel opgeslagen. Uw locatie wordt niet bewaard.
      </Paragraph>
      <Paragraph>
        Uw adres wordt verwijderd zodra u dat aangeeft. Uw toestemming voor het
        gebruik van uw locatie kunt u altijd intrekken.
      </Paragraph>
    </Column>
  </Box>
)
