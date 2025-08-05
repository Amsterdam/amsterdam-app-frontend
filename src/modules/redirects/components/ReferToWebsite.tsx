import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'

export const ReferToWebsite = () => {
  const {isLandscape} = useDeviceContext()

  return (
    <Column gutter="xs">
      <Title
        level="h4"
        text="Niet gevonden wat u zocht?"
      />
      <Column gutter="md">
        <Paragraph>
          Kijk dan op onze website waar al onze informatie staat.
        </Paragraph>
        <Column halign={isLandscape ? 'start' : undefined}>
          <ExternalLinkButton
            accessibilityRole="link"
            label="Naar amsterdam.nl"
            testID="RedirectsWebsiteExternalLinkButton"
            url="https://www.amsterdam.nl"
          />
        </Column>
      </Column>
    </Column>
  )
}
