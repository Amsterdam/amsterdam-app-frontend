import {skipToken} from '@reduxjs/toolkit/query'
import {FormProvider, useForm} from 'react-hook-form'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useDeviceContext} from '@/hooks/useDeviceContext'

import {ParkingMachineSearchResults} from '@/modules/parking/components/permit-zone/ParkingMachineSearchResults'
import {ParkingMachinesTextInputField} from '@/modules/parking/components/permit-zone/ParkingMachinesTextInputField'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  usePermitZonesQuery,
  useParkingMachinesQuery,
} from '@/modules/parking/service'
import {type ParkingMachine} from '@/modules/parking/types'

export const ParkingMachineSearch = ({
  onSelectParkingMachine,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
}) => {
  const {report_code} = useCurrentParkingPermit()
  const {isLandscape, isTablet} = useDeviceContext()

  const form = useForm<{searchText: string}>()

  const {data: permitZoneData, isError: isErrorPermitZoneData} =
    usePermitZonesQuery(report_code)

  const {
    data: parkingMachinesData,
    isLoading: isLoadingParkingMachinesData,
    isError: isErrorParkingMachinesData,
  } = useParkingMachinesQuery(permitZoneData ? undefined : skipToken)

  if (isLoadingParkingMachinesData) {
    return <PleaseWait testID="ParkingMachineSearchPleaseWait" />
  }

  if (
    !parkingMachinesData?.length ||
    isErrorPermitZoneData ||
    isErrorParkingMachinesData
  ) {
    return (
      <SomethingWentWrong testID="ParkingMachineSearchSomethingWentWrong" />
    )
  }

  return (
    <FormProvider {...form}>
      <Box
        grow
        insetHorizontal="md"
        insetVertical={isLandscape && !isTablet ? 'no' : 'md'}>
        <Column gutter="lg">
          <ParkingMachinesTextInputField />
          <ParkingMachineSearchResults
            onSelectParkingMachine={onSelectParkingMachine}
            parkingMachinesData={parkingMachinesData}
          />
        </Column>
      </Box>
    </FormProvider>
  )
}
