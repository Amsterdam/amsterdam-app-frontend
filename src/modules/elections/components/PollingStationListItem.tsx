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

export const PollingStationsListItem = ({
  distanceInMeters,
  pollingStation,
  onPress,
}: Props) => {
  if (!pollingStation) {
    return null
  }

  return (
    <Pressable
      onPress={() => onPress(pollingStation.id)}
      testID="PollingStationListItemButton">
      <Box insetVertical="sm">
        <Column>
          <Title
            color="link"
            level="h5"
            text={pollingStation.name}
          />
          <Paragraph>{getOpeningTimes(pollingStation.openingTimes)}</Paragraph>
          {!!distanceInMeters && (
            <Paragraph color="secondary">
              {distanceInMeters >= 1000
                ? `${(distanceInMeters / 1000).toFixed(1)} km`
                : `${Math.round(distanceInMeters)} meter`}
            </Paragraph>
          )}
        </Column>
      </Box>
    </Pressable>
  )
}
