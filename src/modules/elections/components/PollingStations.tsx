import {useCallback} from 'react'
import {Tabs} from '@/components/ui/Tabs'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {PollingStationsList} from '@/modules/elections/components/PollingStationsList'
import {PollingStationsMap} from '@/modules/elections/components/PollingStationsMap'
import {usePollingStationsQuery} from '@/modules/elections/service'
import {setSelectedPollingStationId} from '@/modules/elections/slice'
import {PollingStation} from '@/modules/elections/types'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const PollingStations = () => {
  const dispatch = useDispatch()
  const {data, isLoading, isError} = usePollingStationsQuery()
  const {address} = useSelectedAddress(ModuleSlug.elections)
  const {open} = useBottomSheet()

  const onSelectPollingStation = useCallback(
    (id: PollingStation['id']) => {
      dispatch(setSelectedPollingStationId(id))
      open()
    },
    [dispatch, open],
  )

  return (
    <Tabs
      grow={1}
      testID="PollingStationsViewTabs">
      <Tabs.Tab
        accessibilityLabel="Kaartweergave"
        label="Kaart">
        <PollingStationsMap
          address={address}
          isError={isError}
          isLoading={isLoading}
          onPress={onSelectPollingStation}
          pollingStations={data}
        />
      </Tabs.Tab>
      <Tabs.Tab
        accessibilityLabel="Lijstweergave"
        label="Lijst">
        <PollingStationsList
          address={address}
          isError={isError}
          isLoading={isLoading}
          onPress={onSelectPollingStation}
          pollingStations={data}
        />
      </Tabs.Tab>
    </Tabs>
  )
}
