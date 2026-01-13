import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {PollingStation} from '@/modules/elections/types'
import {getOpeningTimes} from '@/modules/elections/utils/getOpeningTimes'
import {parseState} from '@/modules/elections/utils/parseState'

type Props = {
  distanceInMeters?: number
  onPress: (pollingStationId: PollingStation['id']) => void
  pollingStation: PollingStation
}

const getDistance = (distanceInMeters?: number) => {
  if (!distanceInMeters) {
    return null
  }

  return distanceInMeters >= 1000
    ? `${(distanceInMeters / 1000).toFixed(1)} km`
    : `${Math.round(distanceInMeters)} meter`
}

export const PollingStationsListItem = ({
  distanceInMeters,
  pollingStation,
  onPress,
}: Props) => {
  if (!pollingStation) {
    return null
  }

  const distance = getDistance(distanceInMeters)
  const openingTimes = getOpeningTimes(pollingStation.openingTimes)

  const {label, icon, color} = parseState(pollingStation)

  return (
    <Box insetHorizontal="md">
      <Pressable
        accessibilityLabel={`${pollingStation.name}, ${openingTimes}, ${distance ? 'Afstand: ' + distance : ''}, ${label}`}
        onPress={() => onPress(pollingStation.id)}
        testID="PollingStationListItemButton">
        <Box insetVertical="sm">
          <Row
            gutter="md"
            valign="center">
            <Icon
              color={color}
              name={icon}
              size="lg"
            />
            <Column>
              <Title
                accessible={false}
                color="link"
                level="h5"
                text={pollingStation.name}
              />
              <Paragraph accessible={false}>{openingTimes}</Paragraph>
              {!!distanceInMeters && (
                <Paragraph
                  accessible={false}
                  color="secondary">
                  {distance}
                </Paragraph>
              )}
            </Column>
          </Row>
        </Box>
      </Pressable>
    </Box>
  )
}
