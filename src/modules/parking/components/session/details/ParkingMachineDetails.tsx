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
import {getHourlyParkingRateFromSessionAndZoneData} from '@/modules/parking/utils/getHourlyParkingRateFromSessionAndZoneData'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingMachineDetails = ({
  parkingSession,
  report_code,
}: ParkingSessionProps & {report_code?: string}) => {
  const {data: parkingMachines, isLoading: isLoadingParkingMachines} =
    useParkingMachinesQuery()

  const {data: parkingZoneData, isLoading: isLoadingParkingMachineData} =
    useZoneByMachineQuery(
      parkingSession.parking_machine && report_code
        ? {
            report_code,
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
      const rate = getHourlyParkingRateFromSessionAndZoneData(
        parkingSession,
        parkingZoneData,
      )

      const start = dayjs(parkingSession.start_date_time)

      const startTimePaymentZoneDay = getPaymentZoneDay(
        parkingZoneData,
        start.day(),
      )

      const timeSpan = getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)

      if (!timeSpan || !rate) {
        return
      }

      return `${timeSpan}, ${rate} per uur`
    }
  }, [parkingSession, parkingZoneData])

  return (
    <ParkingSessionDetailsRow
      iconName="location"
      title={`Parkeerautomaat ${parkingSession.parking_machine}`}>
      {isLoadingParkingMachineData || isLoadingParkingMachines ? (
        <PleaseWait testID="ParkingSessionPleaseWait" />
      ) : (
        <>
          {!!parkingMachine?.address && (
            <Phrase>{parkingMachine.address}</Phrase>
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
