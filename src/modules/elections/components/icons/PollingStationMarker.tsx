import {PollingStationMarkerActiveIcon} from '@/modules/elections/components/icons/PollingStationMarkerActiveIcon'
import {PollingStationMarkerIcon} from '@/modules/elections/components/icons/PollingStationMarkerIcon'
import {useSelectedPollingStationId} from '@/modules/elections/slice'
import {PollingStation} from '@/modules/elections/types'

type Props = {
  id: PollingStation['id']
}

export const PollingStationMarker = ({id}: Props) => {
  const pollingStationId = useSelectedPollingStationId()

  return pollingStationId === id ? (
    <PollingStationMarkerActiveIcon />
  ) : (
    <PollingStationMarkerIcon />
  )
}
