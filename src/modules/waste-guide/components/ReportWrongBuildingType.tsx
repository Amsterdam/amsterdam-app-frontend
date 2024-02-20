import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

const wrongBuildingTypeReactionFormUrl =
  'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'

type Props = TestProps

export const ReportWrongBuildingType = ({testID}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Column>
      <Phrase
        emphasis="strong"
        testID={`${testID}IntroPhrase`}>
        Dit is geen woonadres
      </Phrase>
      <Row
        gutter="xs"
        wrap>
        <Phrase testID={`${testID}Phrase`}>Klopt dit niet?</Phrase>
        <InlineLink
          onPress={() => openWebUrl(wrongBuildingTypeReactionFormUrl)}
          testID={`${testID}Link`}>
          Geef het door
        </InlineLink>
      </Row>
    </Column>
  )
}
