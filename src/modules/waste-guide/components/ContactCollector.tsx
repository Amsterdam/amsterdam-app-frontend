import {Column} from '@/components/ui/layout'
import {Phrase, Title} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenWebUrl} from '@/hooks'

const wasteDisposalBusinessesUrl =
  'https://www.amsterdam.nl/afval-hergebruik/bedrijfsafval/afvalpunt-bedrijven/'

export const ContactCollector = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Column gutter="md">
      <Title level="h5" text="Neem contact op met uw afvalinzamelaar" />
      <Phrase>
        Of kijk voor meer informatie over bedrijfsafval op{' '}
        <InlineLink onPress={() => openWebUrl(wasteDisposalBusinessesUrl)}>
          onze website
        </InlineLink>
      </Phrase>
    </Column>
  )
}
