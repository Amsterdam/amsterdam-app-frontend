import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

export const ParkingInfoSection = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls} = useGetRedirectUrlsQuery()

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text="Alles over parkeren"
      />
      <Column gutter="lg">
        <Paragraph variant="intro">
          In de app regelt u parkeersessies. Op de website staat meer
          informatie, zoals over vergunningen, zones, boetes en tarieven.
        </Paragraph>
        <Button
          iconName="external-link"
          iconSize="md"
          label="Lees meer over parkeren"
          onPress={() => {
            redirectUrls && openWebUrl(redirectUrls?.parking)
          }}
          testID="ParkingHomeParkingInformationButton"
          variant="secondary"
        />
      </Column>
    </Column>
  )
}
