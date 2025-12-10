import {useMemo} from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {useParkingMachinesQuery} from '@/modules/parking/service'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'

export const ParkingMachineList = () => {
  const {address} = useSelectedAddress()
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
      insetLeft="md">
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
            <ShareLocationTopTaskButton
              highAccuracyPurposeKey={
                HighAccuracyPurposeKey.PreciseLocationAddressParking
              }
              testID="ParkingMachineListRequestLocationButton"
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
