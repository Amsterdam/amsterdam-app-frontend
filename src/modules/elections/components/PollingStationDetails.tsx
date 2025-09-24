import {useContext} from 'react'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {PollingStationContext} from '@/modules/elections/providers/PollingStation.context'
import {getOpeningTimes} from '@/modules/elections/utils/getOpeningTimes'
import {RedirectKey} from '@/modules/redirects/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const PollingStationDetails = () => {
  const {pollingStation} = useContext(PollingStationContext)
  const {close: closeBottomSheet} = useBottomSheet()
  const {lat, lng} = pollingStation?.position || {}
  const directionsUrl =
    lat && lng ? useGetGoogleMapsDirectionsUrl({lat, lon: lng}) : undefined

  if (!pollingStation) {
    return null
  }

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            text={pollingStation?.name}
          />
          <IconButton
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="PollingStationDetailsCloseButton"
          />
        </Row>
        <Row
          gutter="md"
          valign="start">
          <Box insetTop="xs">
            <Icon
              name="clock"
              size="lg"
            />
          </Box>
          <Column>
            <Title
              level="h5"
              text="Openingstijden"
            />
            <Paragraph>
              {getOpeningTimes(pollingStation.openingTimes)}
            </Paragraph>
          </Column>
        </Row>
        <Row
          gutter="md"
          valign="start">
          <Box insetTop="xs">
            <Icon
              name="location"
              size="lg"
            />
          </Box>
          <Column halign="start">
            <Title
              level="h5"
              text="Adres"
            />
            <Paragraph>{pollingStation.address1}</Paragraph>
            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="PollingStationDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          </Column>
        </Row>
        <Row align="start">
          <ExternalLinkButton
            label="Meer informatie over de verkiezingen"
            noPadding
            redirectKey={RedirectKey.elections}
            testID="PollingStationDetailsElectionsExternalLinkButton"
            variant="tertiary"
          />
        </Row>
      </Column>
    </Box>
  )
}
