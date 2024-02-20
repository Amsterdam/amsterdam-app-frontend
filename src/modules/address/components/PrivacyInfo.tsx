import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const PrivacyInfo = () => (
  <Box>
    <Column gutter="md">
      <Title
        testID="AddressPrivacyInfoTitle"
        text="Zo gebruiken wij uw locatie en adres"
      />
      <Paragraph>
        We gebruiken alleen uw adres en locatie om de juiste informatie te laten
        zien. De app slaat geen gegevens op en bewaart geen locatie. U kunt uw
        toestemming voor het gebruik van deze gegevens altijd intrekken.
      </Paragraph>
    </Column>
  </Box>
)
