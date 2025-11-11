import {skipToken} from '@reduxjs/toolkit/query'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  usePermitZonesQuery,
  useParkingMachinesQuery,
} from '@/modules/parking/service'
import {
  ParkingPermitZonesBottomSheetVariant,
  type ParkingMachine,
} from '@/modules/parking/types'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'

export const ParkingMachineList = ({
  onSelectParkingMachine,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
}) => {
  const {report_code} = useCurrentParkingPermit()
  const {address} = useSelectedAddress()

  const {data: permitZoneData, isError: isErrorPermitZoneData} =
    usePermitZonesQuery(report_code)

  const {
    data: parkingMachinesData,
    isLoading: isLoadingParkingMachinesData,
    isError: isErrorParkingMachinesData,
  } = useParkingMachinesQuery(permitZoneData ? undefined : skipToken)

  if (isLoadingParkingMachinesData) {
    return <PleaseWait testID="ParkingMachineListPleaseWait" />
  }

  if (
    !parkingMachinesData?.length ||
    isErrorPermitZoneData ||
    isErrorParkingMachinesData
  ) {
    return <SomethingWentWrong testID="ParkingMachineListSomethingWentWrong" />
  }

  const parkingMachinesByDistance = getSortedParkingMachines(
    parkingMachinesData,
    address,
  )

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
              newVariant={ParkingPermitZonesBottomSheetVariant.address}
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
