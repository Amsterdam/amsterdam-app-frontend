import {Column} from '@/components/ui/layout'
import {Phrase, Title} from '@/components/ui/text'
import {openWebUrl} from '@/utils'

const wasteDisposalBusinessesUrl =
  'https://www.amsterdam.nl/afval-hergebruik/bedrijfsafval/afvalpunt-bedrijven/'

export const ContactCollector = () => (
  <Column gutter="md">
    <Title level="h5" text="Neem contact op met uw afvalinzamelaar" />
    <Phrase>
      Of kijk voor meer informatie over bedrijfsafval op{' '}
      <Phrase
        color="link"
        onPress={() => openWebUrl(wasteDisposalBusinessesUrl)}
        underline>
        onze website
      </Phrase>
    </Phrase>
  </Column>
)
