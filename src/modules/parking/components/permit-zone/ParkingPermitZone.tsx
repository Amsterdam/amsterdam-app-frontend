import {Tabs} from '@/components/ui/Tabs'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingMachineSearch} from '@/modules/parking/components/permit-zone/ParkingMachineSearch'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

type Props = {variant: 'list' | 'search'}

export const ParkingPermitZone = ({variant}: Props) => {
  const {permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)

  return (
    <Tabs
      grow={1}
      testID="ParkingPermitZoneViewTabs">
      <Tabs.Tab
        accessibilityLabel="Kaartweergave"
        label="Kaart">
        <ParkingPermitZoneMap />
      </Tabs.Tab>
      {variant === 'search' ? (
        <Tabs.Tab
          accessibilityLabel="Zoekweergave"
          label="Zoeken">
          <ParkingMachineSearch />
        </Tabs.Tab>
      ) : (
        <Tabs.Tab
          accessibilityLabel="Lijstweergave"
          label="Lijst">
          <ParkingMachineList />
        </Tabs.Tab>
      )}
    </Tabs>
  )
}
