import {Fragment} from 'react'
import {View} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {WASTE_DISPOSAL_BUSINESS_URL} from '@/modules/waste-guide/external-links'

const InlineLinkWasteContainer = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <InlineLink
      onPress={() => openWebUrl(WASTE_DISPOSAL_BUSINESS_URL)}
      testID="WasteGuideBusinessesLink">
      onze website.
    </InlineLink>
  )
}

export const ContactCollector = () => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const Container = isScreenReaderEnabled ? Column : Fragment

  return (
    <Column gutter="md">
      <Title
        level="h5"
        text="Neem contact op met uw afvalinzamelaar"
      />
      <View>
        <Container>
          <Phrase testID="WasteGuideBusinessesInfoPhrase">
            Of kijk voor meer informatie over bedrijfsafval op{' '}
          </Phrase>
          <InlineLinkWasteContainer />
        </Container>
      </View>
    </Column>
  )
}
