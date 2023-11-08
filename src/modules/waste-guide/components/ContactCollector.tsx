import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

const wasteDisposalBusinessesUrl =
  'https://www.amsterdam.nl/afval-hergebruik/bedrijfsafval/afvalpunt-bedrijven/'

export const ContactCollector = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Column gutter="md">
      <Title
        level="h5"
        text="Neem contact op met uw afvalinzamelaar"
      />
      <Phrase accessibilityRole="link">
        Of kijk voor meer informatie over bedrijfsafval op{' '}
        <InlineLink onPress={() => openWebUrl(wasteDisposalBusinessesUrl)}>
          onze website
        </InlineLink>
        .
      </Phrase>
    </Column>
  )
}
