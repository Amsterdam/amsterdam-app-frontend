import {usePollingStationsQuery} from '@/modules/elections/service'
import {useSelectedPollingStationId} from '@/modules/elections/slice'

export const useSelectedPollingStation = () => {
  const pollingStationId = useSelectedPollingStationId()
  const {data} = usePollingStationsQuery()

  return data?.find(station => station.id === pollingStationId)
}
