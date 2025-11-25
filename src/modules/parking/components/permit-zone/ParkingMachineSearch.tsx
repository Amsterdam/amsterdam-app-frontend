import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo, useState} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Column} from '@/components/ui/layout/Column'
import {useDeviceContext} from '@/hooks/useDeviceContext'

import {ParkingMachineSearchResults} from '@/modules/parking/components/permit-zone/ParkingMachineSearchResults'
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
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: permitZoneData,
    isLoading: isLoadingPermitZoneData,
    isError: isErrorPermitZoneData,
  } = usePermitZonesQuery(report_code)

  const {
    data: parkingMachinesData,
    isLoading: isLoadingParkingMachinesData,
    isError: isErrorParkingMachinesData,
  } = useParkingMachinesQuery(permitZoneData ? undefined : skipToken)

  const filteredParkingMachines = useMemo(() => {
    if (searchTerm && parkingMachinesData) {
      return parkingMachinesData.filter(machine =>
        machine.id.startsWith(searchTerm),
      )
    }

    return []
  }, [parkingMachinesData, searchTerm])

  if (isLoadingParkingMachinesData || isLoadingPermitZoneData) {
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
    <Box
      grow
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'no' : 'md'}>
      <Column gutter="lg">
        <SearchField
          accessibilityLabel="Zoek een parkeerautomaat"
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          keyboardType="number-pad"
          onChangeText={text => setSearchTerm(text.replaceAll(/[^0-9]/g, ''))}
          placeholder="Nummer parkeerautomaat"
          testID="ParkingMachineSearchTextSearchField"
          value={searchTerm}
        />
        <ParkingMachineSearchResults
          onSelectParkingMachine={onSelectParkingMachine}
          parkingMachinesData={filteredParkingMachines}
        />
      </Column>
    </Box>
  )
}
