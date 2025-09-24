import {Tabs} from '@/components/ui/Tabs'
import {PollingStationsList} from '@/modules/elections/components/PollingStationsList'
import {PollingStationsMap} from '@/modules/elections/components/PollingStationsMap'
import {usePollingStationsQuery} from '@/modules/elections/service'

export const PollingStations = () => {
  const {data} = usePollingStationsQuery()

  return (
    <Tabs testID="PollingStationsViewTabs">
      <Tabs.Tab
        accessibilityLabel="Kaartweergave"
        label="Kaart">
        <PollingStationsMap pollingStations={data} />
      </Tabs.Tab>
      <Tabs.Tab
        accessibilityLabel="Lijstweergave"
        label="Lijst">
        <PollingStationsList pollingStations={data} />
      </Tabs.Tab>
    </Tabs>
  )
}
