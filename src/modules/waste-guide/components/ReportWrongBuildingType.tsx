import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

const wrongBuildingTypeReactionFormUrl =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

export const ReportWrongBuildingType = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Column>
      <Phrase emphasis="strong">Dit is geen woonadres</Phrase>
      <Row
        gutter="xs"
        wrap>
        <Phrase>Klopt dit niet?</Phrase>
        <InlineLink
          onPress={() => openWebUrl(wrongBuildingTypeReactionFormUrl)}>
          Geef het door
        </InlineLink>
      </Row>
    </Column>
  )
}
