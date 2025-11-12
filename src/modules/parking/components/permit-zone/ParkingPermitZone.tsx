import {useCallback} from 'react'
import {Tabs} from '@/components/ui/Tabs'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {setSelectedParkingMachineId} from '@/modules/parking/slice'
import {
  ParkingPermitZonesBottomSheetVariant,
  type ParkingMachine,
} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {variant: 'list' | 'search'}

export const ParkingPermitZone = ({variant}: Props) => {
  const {permit_zone} = useCurrentParkingPermit()

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  useSetScreenTitle(permit_zone.name)

  const onSelectParkingMachine = useCallback(
    (id: ParkingMachine['id']) => {
      dispatch(setSelectedParkingMachineId(id))
      open(ParkingPermitZonesBottomSheetVariant.parkingMachine)
    },
    [open, dispatch],
  )

  return (
    <Tabs
      grow={1}
      testID="ParkingPermitZoneViewTabs">
      <Tabs.Tab
        accessibilityLabel="Kaartweergave"
        label="Kaart">
        <ParkingPermitZoneMap onSelectParkingMachine={onSelectParkingMachine} />
      </Tabs.Tab>
      {variant === 'search' ? (
        <Tabs.Tab
          accessibilityLabel="Zoekweergave"
          label="Zoeken">
          <ParkingMachineList onSelectParkingMachine={onSelectParkingMachine} />
        </Tabs.Tab>
      ) : (
        <Tabs.Tab
          accessibilityLabel="Lijstweergave"
          label="Lijst">
          <ParkingMachineList onSelectParkingMachine={onSelectParkingMachine} />
        </Tabs.Tab>
      )}
    </Tabs>
  )
}
