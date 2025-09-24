import {Title} from '@/components/ui/text/Title'
import {PollingStation} from '@/modules/elections/types'

type Props = {
  pollingStations?: PollingStation[]
}

export const PollingStationsMap = ({pollingStations}: Props) => {
  if (!pollingStations || !pollingStations.length) {
    return null
  }

  return <Title text={pollingStations?.[0]?.name} />
}
