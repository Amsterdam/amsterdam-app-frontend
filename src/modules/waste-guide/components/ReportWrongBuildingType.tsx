import {Column} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {openWebUrl} from '@/utils'

const reactionFormUrl =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

export const ReportWrongBuildingType = () => (
  <Column>
    <Phrase emphasis="strong">Dit is geen woonadres</Phrase>
    <Phrase>
      Klopt dit niet?{' '}
      <Phrase
        color="link"
        onPress={() => openWebUrl(reactionFormUrl)}
        underline>
        Geef het door
      </Phrase>
    </Phrase>
  </Column>
)
