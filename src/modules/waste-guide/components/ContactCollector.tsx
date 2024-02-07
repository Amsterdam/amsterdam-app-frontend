import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

const wasteDisposalBusinessesUrl =
  'https://www.amsterdam.nl/afval-hergebruik/bedrijfsafval/afvalpunten-bedrijven/'

const InlineLinkWasteContainer = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <InlineLink onPress={() => openWebUrl(wasteDisposalBusinessesUrl)}>
      onze website.
    </InlineLink>
  )
}

export const ContactCollector = () => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return (
    <Column gutter="md">
      <Title
        level="h5"
        text="Neem contact op met uw afvalinzamelaar"
      />
      {isScreenReaderEnabled ? (
        <Column>
          <Phrase>Of kijk voor meer informatie over bedrijfsafval op </Phrase>
          <InlineLinkWasteContainer />
        </Column>
      ) : (
        <Phrase>
          Of kijk voor meer informatie over bedrijfsafval op{' '}
          <InlineLinkWasteContainer />.
        </Phrase>
      )}
    </Column>
  )
}
