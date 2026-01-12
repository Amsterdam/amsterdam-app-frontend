import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {PollingStation} from '@/modules/elections/types'
import {getOpeningTimes} from '@/modules/elections/utils/getOpeningTimes'

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

  return (
    <Box insetHorizontal="md">
      <Pressable
        accessibilityLabel={`${pollingStation.name}, ${openingTimes}, ${distance ? 'Afstand: ' + distance : ''}`}
        onPress={() => onPress(pollingStation.id)}
        testID="PollingStationListItemButton">
        <Box insetVertical="sm">
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
        </Box>
      </Pressable>
    </Box>
  )
}
