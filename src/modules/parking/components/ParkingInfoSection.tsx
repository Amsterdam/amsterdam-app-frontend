import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

type Props = {
  isIntro?: boolean
}

export const ParkingInfoSection = ({isIntro}: Props) => (
  <Column gutter="md">
    <Title
      level="h2"
      text="Alles over parkeren"
    />
    <Column gutter="lg">
      <Paragraph variant={isIntro ? 'intro' : 'body'}>
        In de app regelt u parkeersessies. Op de website staat meer informatie,
        zoals over vergunningen, zones, boetes en tarieven.
      </Paragraph>
      <ExternalLinkButton
        label="Lees meer over parkeren"
        redirectKey={RedirectKey.parking}
        testID="ParkingHomeParkingInformationExternalLinkButton"
        variant="secondary"
      />
    </Column>
  </Column>
)
