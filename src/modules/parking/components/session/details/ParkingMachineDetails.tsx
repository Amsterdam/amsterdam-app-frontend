import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {ParkingSessionProps} from '@/modules/parking/components/session/details/ParkingSessionDetails'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Phrase} from '@/components/ui/text/Phrase'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {ParkingSessionDetailsRow} from '@/modules/parking/components/session/details/ParkingSessionDetailsRow'
import {
  useParkingMachinesQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {extractAddressFromParkingMachineName} from '@/modules/parking/utils/extractAddressFromParkingMachineName'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingMachineDetails = ({
  parkingSession,
  permitId,
}: ParkingSessionProps & {permitId?: string}) => {
  const {data: parkingMachines, isLoading: isLoadingParkingMachines} =
    useParkingMachinesQuery()

  const {data: parkingZoneData, isLoading: isLoadingParkingMachineData} =
    useZoneByMachineQuery(
      parkingSession.parking_machine && permitId
        ? {
            permitId,
            machineId: parkingSession.parking_machine,
          }
        : skipToken,
    )

  const parkingMachine = parkingMachines?.find(
    p => p.id === parkingSession.parking_machine,
  )

  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: parkingMachine?.lat,
    lon: parkingMachine?.lon,
  })

  const parkingRateTimeString = useMemo(() => {
    if ('parking_cost' in parkingSession && parkingZoneData) {
      const start = dayjs(parkingSession.start_date_time)
      const end = dayjs(parkingSession.end_date_time)
      const hours = end.diff(start, 'hour', true)

      const startTimePaymentZoneDay = getPaymentZoneDay(
        parkingZoneData,
        start.day(),
      )

      const {value, currency} = parkingSession.parking_cost
      const timeSpan = getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)

      const rate = formatNumber(value / hours, currency)

      return `${timeSpan}, ${rate} per uur`
    }
  }, [parkingSession, parkingZoneData])

  return (
    <ParkingSessionDetailsRow
      icon="location"
      title={`Parkeerautomaat ${parkingSession.parking_machine}`}>
      {isLoadingParkingMachineData || isLoadingParkingMachines ? (
        <PleaseWait testID="ParkingSessionPleaseWait" />
      ) : (
        <>
          {parkingMachine?.name && (
            <Phrase>
              {extractAddressFromParkingMachineName(parkingMachine.name)}
            </Phrase>
          )}
          {!!parkingRateTimeString && <Phrase>{parkingRateTimeString}</Phrase>}
          {!!directionsUrl && (
            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="PollingStationDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          )}
        </>
      )}
    </ParkingSessionDetailsRow>
  )
}
