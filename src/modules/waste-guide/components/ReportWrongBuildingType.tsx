import {Column} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {openWebUrl} from '@/utils'

const wrongBuildingTypeReactionFormUrl =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

export const ReportWrongBuildingType = () => (
  <Column>
    <Phrase emphasis="strong">Dit is geen woonadres</Phrase>
    <Phrase>
      Klopt dit niet?{' '}
      <InlineLink onPress={() => openWebUrl(wrongBuildingTypeReactionFormUrl)}>
        Geef het door
      </InlineLink>
    </Phrase>
  </Column>
)
