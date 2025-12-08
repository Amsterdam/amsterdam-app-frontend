import {useMemo} from 'react'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {Marker} from '@/components/features/map/marker/Marker'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {useParkingMachinesQuery} from '@/modules/parking/service'

enum MarkerZIndex {
  cluster,
  filteredMarker,
}

export const ParkingPermitZoneMapMarkers = () => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {
    onSelectParkingMachine,
    selectedParkingMachineId,
    region,
    animateToCluster,
  } = usePermitMapContext()

  const {data: parkingMachines} = useParkingMachinesQuery()

  const [favoriteMachine, otherMachines] = useMemo(
    () => [
      parkingMachines?.find(machine => machine.id === parking_machine_favorite),
      parkingMachines?.filter(
        machine => machine.id !== parking_machine_favorite,
      ) || [],
    ],
    [parkingMachines, parking_machine_favorite],
  )

  const markerVariant = getMarkerVariant(
    selectedParkingMachineId,
    parking_machine_favorite ?? parking_machine_favorite,
  )

  return (
    <>
      <Clusterer
        data={otherMachines.map(({lon, lat, id, ...props}) => ({
          type: 'Feature',
          properties: {
            ...props,
            id,
            variant: markerVariant(id),
            onMarkerPress: () => onSelectParkingMachine(id),
          },
          geometry: {type: 'Point', coordinates: [lon, lat]},
        }))}
        onClusterPress={animateToCluster}
        region={region}
        zIndex={MarkerZIndex.cluster}
      />

      {!!favoriteMachine && (
        <Marker
          coordinate={{
            latitude: favoriteMachine.lat,
            longitude: favoriteMachine.lon,
          }}
          key={favoriteMachine.id}
          onPress={() => onSelectParkingMachine(favoriteMachine.id)}
          onSelect={() => onSelectParkingMachine(favoriteMachine.id)}
          variant={markerVariant(favoriteMachine.id)}
          zIndex={MarkerZIndex.filteredMarker}
        />
      )}
    </>
  )
}
