import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const ParkingInfoSection = () => (
  <Column gutter="md">
    <Title
      level="h2"
      text="Alles over parkeren"
    />
    <Column gutter="lg">
      <Paragraph variant="intro">
        In de app regelt u parkeersessies. Op de website staat meer informatie,
        zoals over vergunningen, zones, boetes en tarieven.
      </Paragraph>
      <ExternalLinkButton
        label="Lees meer over parkeren"
        redirectKey={RedirectKey.parking}
        testID="ParkingHomeParkingInformationButton"
        variant="secondary"
      />
    </Column>
  </Column>
)
