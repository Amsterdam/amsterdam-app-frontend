import {useMemo} from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {useParkingMachinesQuery} from '@/modules/parking/service'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'
import {ReduxKey} from '@/store/types/reduxKey'

export const ParkingMachineList = () => {
  const {address} = useModuleBasedSelectedAddress(ReduxKey.parking)
  const {onSelectParkingMachine} = usePermitMapContext()

  const {
    data: parkingMachinesData,
    isLoading: isLoadingParkingMachinesData,
    isError: isErrorParkingMachinesData,
  } = useParkingMachinesQuery()

  const parkingMachinesByDistance = useMemo(
    () => getSortedParkingMachines(parkingMachinesData || [], address),
    [parkingMachinesData, address],
  )

  if (isLoadingParkingMachinesData) {
    return <PleaseWait testID="ParkingMachineListPleaseWait" />
  }

  if (!parkingMachinesByDistance?.length || isErrorParkingMachinesData) {
    return <SomethingWentWrong testID="ParkingMachineListSomethingWentWrong" />
  }

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <FlatList
        data={parkingMachinesByDistance}
        ListHeaderComponent={
          <Box insetVertical="lg">
            {!address && (
              <Title
                level="h3"
                shrink={0}
                text="Voer een adres in en zie parkeerautomaten in de buurt"
              />
            )}
            <AddressSwitch
              highAccuracyPurposeKey={
                HighAccuracyPurposeKey.PreciseLocationAddressParking
              }
              reduxKey={ReduxKey.parking}
              testID="ParkingMachineListAddressSwitch"
            />
          </Box>
        }
        renderItem={({item: parkingMachine}) => (
          <ParkingMachineListItem
            onPress={onSelectParkingMachine}
            parkingMachine={parkingMachine}
          />
        )}
      />
    </Box>
  )
}
