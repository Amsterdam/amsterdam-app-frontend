import {useCallback, useMemo, useRef, useState, type ReactNode} from 'react'
import type {Region} from 'react-native-maps'
import type MapView from 'react-native-maps'
import {PermitMapContext} from '@/modules/parking/providers/PermitMap.context'
import {
  ParkingPermitZonesBottomSheetVariant,
  type ParkingMachine,
} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const PermitMapProvider = ({children}: {children: ReactNode}) => {
  const [selectedMachineId, setSelectedMachineId] = useState<
    ParkingMachine['id'] | undefined
  >(undefined)
  const [region, setRegion] = useState<Region | undefined>()
  const mapRef = useRef<MapView>(null)

  const {open} = useBottomSheet()

  const onSelectParkingMachine = useCallback(
    (id: ParkingMachine['id']) => {
      setSelectedMachineId(id)
      open(ParkingPermitZonesBottomSheetVariant.parkingMachine)
    },
    [open],
  )

  const resetSelectedParkingMachineId = useCallback(
    () => setSelectedMachineId(undefined),
    [setSelectedMachineId],
  )

  const changeRegion = useCallback((newRegion: Region) => {
    setRegion(newRegion)
  }, [])

  const animateToCluster = useCallback(
    (clusterRegion: Region) => {
      if (!mapRef.current) {
        return
      }

      mapRef.current.animateToRegion(clusterRegion)
    },
    [mapRef],
  )

  const value = useMemo(
    () => ({
      region,
      setRegion: changeRegion,
      onSelectParkingMachine,
      resetSelectedParkingMachineId,
      selectedParkingMachineId: selectedMachineId,
      animateToCluster,
      mapRef,
    }),
    [
      selectedMachineId,
      resetSelectedParkingMachineId,
      onSelectParkingMachine,
      changeRegion,
      region,
      animateToCluster,
      mapRef,
    ],
  )

  return (
    <PermitMapContext.Provider value={value}>
      {children}
    </PermitMapContext.Provider>
  )
}
