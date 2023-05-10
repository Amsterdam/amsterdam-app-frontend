import {Column} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenWebUrl} from '@/hooks'

const wrongBuildingTypeReactionFormUrl =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

export const ReportWrongBuildingType = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Column>
      <Phrase emphasis="strong">Dit is geen woonadres</Phrase>
      <Phrase>
        Klopt dit niet?{' '}
        <InlineLink
          onPress={() => openWebUrl(wrongBuildingTypeReactionFormUrl)}>
          Geef het door
        </InlineLink>
      </Phrase>
    </Column>
  )
}
