import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'

export const WasteGuideForWeesp = () => {
  const {address} = useSelectedAddress()
  const openWebUrl = useOpenWebUrl()

  if (!address) {
    return (
      <SomethingWentWrong testID="WasteGuideWasteGuideForWeespSomethingWentWrong" />
    )
  }

  const {postcode, number, addition = ''} = address

  const gadUrl =
    'https://inzamelkalender.gad.nl/adres/' +
    [postcode, number, addition].join(':')

  return (
    <Column gutter="lg">
      <Column gutter="md">
        <Paragraph>
          In Weesp haalt de GAD het afval op. Kijk op hun website hoe dat werkt.
        </Paragraph>
      </Column>
      <Row align="start">
        <Button
          accessibilityRole="link"
          iconName="external-link"
          label="Ga naar GAD.nl"
          onPress={() => {
            openWebUrl(gadUrl)
          }}
          testID="WasteGuideGoToGadButton"
        />
      </Row>
    </Column>
  )
}
