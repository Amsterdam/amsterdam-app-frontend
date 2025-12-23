import {FlatList} from 'react-native'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {ParkingMachineFavoriteButton} from '@/modules/parking/components/permit-zone/ParkingMachineFavoriteButton'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

import {type ParkingMachine} from '@/modules/parking/types'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'
import {ReduxKey} from '@/store/types/reduxKey'

export const ParkingMachineSearchResults = ({
  onSelectParkingMachine,
  parkingMachinesData,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  parkingMachinesData: ParkingMachine[]
}) => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {address} = useModuleBasedSelectedAddress(ReduxKey.parking)

  const parkingMachinesByDistance = getSortedParkingMachines(
    parkingMachinesData,
    address,
  )

  return (
    <FlatList
      data={parkingMachinesByDistance}
      ListEmptyComponent={
        <ParkingMachineFavoriteButton onPress={onSelectParkingMachine} />
      }
      renderItem={({item: parkingMachine}) => {
        if (parkingMachine.id === parking_machine_favorite) {
          return (
            <ParkingMachineFavoriteButton onPress={onSelectParkingMachine} />
          )
        }

        return (
          <ParkingMachineListItem
            onPress={onSelectParkingMachine}
            parkingMachine={parkingMachine}
            showIcon
          />
        )
      }}
    />
  )
}
