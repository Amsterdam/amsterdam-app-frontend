import {useCallback, useMemo, useState, type ReactNode} from 'react'
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

  const value = useMemo(
    () => ({
      onSelectParkingMachine,
      resetSelectedParkingMachineId,
      selectedParkingMachineId: selectedMachineId,
    }),
    [selectedMachineId, resetSelectedParkingMachineId, onSelectParkingMachine],
  )

  return (
    <PermitMapContext.Provider value={value}>
      {children}
    </PermitMapContext.Provider>
  )
}
