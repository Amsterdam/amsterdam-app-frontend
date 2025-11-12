import {useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {FlatList} from 'react-native'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {ParkingStartSessionParkingMachineFavoriteButton} from '@/modules/parking/components/session/ParkingStartSessionParkingMachineFavoriteButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

import {type ParkingMachine} from '@/modules/parking/types'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'

export const ParkingMachineSearchResults = ({
  onSelectParkingMachine,
  parkingMachinesData,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  parkingMachinesData: ParkingMachine[]
}) => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {address} = useSelectedAddress()

  const {watch} = useFormContext<{searchText: string}>()
  const searchText = watch('searchText')

  const filteredParkingMachines = useMemo(() => {
    if (searchText) {
      return parkingMachinesData.filter(machine =>
        machine.id.includes(searchText),
      )
    }

    return []
  }, [parkingMachinesData, searchText])

  const parkingMachinesByDistance = getSortedParkingMachines(
    filteredParkingMachines,
    address,
  )

  return (
    <FlatList
      data={parkingMachinesByDistance}
      ListEmptyComponent={
        <ParkingStartSessionParkingMachineFavoriteButton
          onPress={onSelectParkingMachine}
        />
      }
      renderItem={({item: parkingMachine}) => {
        if (parkingMachine.id === parking_machine_favorite) {
          return (
            <ParkingStartSessionParkingMachineFavoriteButton
              onPress={onSelectParkingMachine}
            />
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
