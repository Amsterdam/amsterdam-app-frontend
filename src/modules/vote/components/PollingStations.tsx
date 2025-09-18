import {Tabs} from '@/components/ui/Tabs'
import {PollingStationsList} from '@/modules/vote/components/PollingStationsList'
import {PollingStationsMap} from '@/modules/vote/components/PollingStationsMap'
import {useLocationsQuery} from '@/modules/vote/service'

export const PollingStations = () => {
  const {data} = useLocationsQuery()

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
