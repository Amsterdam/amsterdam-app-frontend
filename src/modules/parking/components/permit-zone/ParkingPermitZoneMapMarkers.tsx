import {useMemo} from 'react'
import type {ParkingMachine} from '@/modules/parking/types'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {Marker} from '@/components/features/map/marker/Marker'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {separateMarkersById} from '@/components/features/map/utils/separateMarkersById'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'

enum MarkerZIndex {
  cluster,
  filteredMarker,
}

export const ParkingPermitZoneMapMarkers = ({
  parkingMachinesData,
  clusterFilter = [],
}: {
  clusterFilter?: Array<ParkingMachine['id']> | ParkingMachine['id']
  parkingMachinesData: ParkingMachine[]
}) => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {onSelectParkingMachine, selectedParkingMachineId, region} =
    usePermitMapContext()

  const {excluded: favoriteMachines, included: clusterData} = useMemo(() => {
    if (!clusterFilter || !clusterFilter?.length) {
      return {excluded: [], included: parkingMachinesData}
    }

    return separateMarkersById<ParkingMachine>(
      clusterFilter,
      parkingMachinesData,
    )
  }, [parkingMachinesData, clusterFilter])

  const markerVariant = getMarkerVariant(
    selectedParkingMachineId,
    parking_machine_favorite ?? parking_machine_favorite,
  )

  return (
    <>
      <Clusterer
        data={clusterData.map(({lon, lat, ...props}) => ({
          type: 'Feature',
          properties: {
            ...props,
            variant: markerVariant(props.id),
            onItemPress: () => onSelectParkingMachine(props.id),
          },
          geometry: {type: 'Point', coordinates: [lon, lat]},
        }))}
        region={region}
        zIndex={MarkerZIndex.cluster}
      />

      {favoriteMachines?.map(machine => (
        <Marker
          coordinate={{
            latitude: machine.lat,
            longitude: machine.lon,
          }}
          key={machine.id}
          onPress={() => onSelectParkingMachine(machine.id)}
          onSelect={() => onSelectParkingMachine(machine.id)}
          variant={markerVariant(machine.id)}
          zIndex={MarkerZIndex.filteredMarker}
        />
      ))}
    </>
  )
}
