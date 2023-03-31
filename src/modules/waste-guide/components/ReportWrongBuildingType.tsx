import {Column, Row} from '@/components/ui/layout'
import {Link, Phrase} from '@/components/ui/text'
import {openWebUrl} from '@/utils'

const url =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

export const ReportWrongBuildingType = () => (
  <Column>
    <Phrase emphasis="strong">Dit is geen woonadres</Phrase>
    <Row gutter="xs">
      <Phrase>Klopt dit niet?</Phrase>
      <Link
        label="Geef het door"
        onPress={() => openWebUrl(url)}
        variant="underline"
      />
    </Row>
  </Column>
)
