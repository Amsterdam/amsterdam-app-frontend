import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {ParkingSessionDetailsAdjustEndTimeButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsAdjustEndTimeButton'
import {ParkingSessionDetailsDeleteButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsDeleteButton'
import {ParkingSessionDetailsRow} from '@/modules/parking/components/session/details/ParkingSessionDetailsRow'
import {ParkingSessionDetailsStopButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsStopButton'
import {ParkingSessionDetailsVisitorExtendButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsVisitorExtendButton'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {
  useParkingMachinesQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingApiVersion,
  ParkingHistorySession,
  ParkingPermitScope,
  ParkingSession,
  ParkingSessionStatus,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {extractAddressFromParkingMachineName} from '@/modules/parking/utils/extractAddressFromParkingMachineName'
import {getPermitZoneIdentifier} from '@/modules/parking/utils/getPermitZoneIdentifier'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionDetails = ({parkingSession}: Props) => {
  const {navigate} = useNavigation()
  const apiVersion = useCurrentParkingApiVersion()

  const parkingAccount = useParkingAccount()

  const licensePlateString = `${parkingSession.vehicle_id}${parkingSession.visitor_name ? ' - ' + parkingSession.visitor_name : ''}`

  const {permits, isLoading} = useGetPermits()

  const {data: parkingMachines, isLoading: isLoadingParkingMachines} =
    useParkingMachinesQuery(
      apiVersion === ParkingApiVersion.v1 ? skipToken : undefined,
    )

  const parkingMachine = parkingMachines?.find(
    p => p.id === parkingSession.parking_machine,
  )

  const {permit_zone, report_code, money_balance_applicable} =
    permits?.find(
      permit =>
        permit.report_code.toString() === parkingSession.report_code.toString(),
    ) ?? {}

  const {data: parkingMachineData, isLoading: isLoadingParkingMachineData} =
    useZoneByMachineQuery(
      parkingSession.parking_machine &&
        report_code &&
        apiVersion === ParkingApiVersion.v2
        ? {
            permitId: report_code,
            machineId: parkingSession.parking_machine,
          }
        : skipToken,
    )

  const parkingRateTimeString = useMemo(() => {
    if ('parking_cost' in parkingSession && parkingMachineData) {
      const start = dayjs(parkingSession.start_date_time)
      const end = dayjs(parkingSession.end_date_time)
      const hours = end.diff(start, 'hour', true)

      const startTimePaymentZoneDay = getPaymentZoneDay(
        parkingMachineData,
        start.day(),
      )

      const {value, currency} = parkingSession.parking_cost
      const timeSpan = getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)

      const rate = formatNumber(value / 100 / hours, currency)

      return `${timeSpan}, ${rate} per uur`
    }
  }, [parkingSession, parkingMachineData])

  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: parkingMachine?.lat,
    lon: parkingMachine?.lon,
  })

  const shouldShowCosts =
    !!money_balance_applicable &&
    'parking_cost' in parkingSession &&
    !!parkingSession.parking_cost.value

  return (
    <Box>
      <Column gutter="lg">
        <ParkingSessionDetailsRow
          icon="parkingCar"
          title="Kenteken">
          <Phrase>{licensePlateString}</Phrase>
        </ParkingSessionDetailsRow>

        {parkingSession.parking_machine ? (
          <ParkingSessionDetailsRow
            icon="location"
            title={`Parkeerautomaat ${parkingSession.parking_machine}`}>
            {isLoading ||
            isLoadingParkingMachineData ||
            isLoadingParkingMachines ? (
              <PleaseWait testID="ParkingSessionPleaseWait" />
            ) : (
              <>
                {parkingMachine?.name && (
                  <Phrase>
                    {extractAddressFromParkingMachineName(parkingMachine.name)}
                  </Phrase>
                )}
                {!!parkingRateTimeString && (
                  <Phrase>{parkingRateTimeString}</Phrase>
                )}
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
        ) : (
          <ParkingSessionDetailsRow
            icon="location"
            title={getPermitZoneIdentifier(permit_zone)}>
            <NavigationButton
              emphasis="default"
              iconSize="smd"
              insetHorizontal="no"
              insetVertical="no"
              onPress={() => navigate('ParkingPermitZones')}
              testID="ParkingParkingPermitZonesButton"
              title="Kaart bekijken"
            />
          </ParkingSessionDetailsRow>
        )}

        <ParkingSessionDetailsRow
          icon="clock"
          title={`Parkeertijd: ${formatTimeRangeToDisplay(
            parkingSession.start_date_time,
            parkingSession.end_date_time,
          )}`}>
          <Phrase>
            {formatDateTimeToDisplay(parkingSession.start_date_time, false)}
          </Phrase>
          {!!parkingSession.end_date_time && (
            <Phrase>
              {formatDateTimeToDisplay(parkingSession.end_date_time, false)}
            </Phrase>
          )}
        </ParkingSessionDetailsRow>

        {!!shouldShowCosts && (
          <ParkingSessionDetailsRow
            icon="euroCoinsInverted"
            title="Kosten">
            <Phrase>
              {formatNumber(
                parkingSession.parking_cost.value / 100,
                parkingSession.parking_cost.currency,
              )}
            </Phrase>
          </ParkingSessionDetailsRow>
        )}

        {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
          <>
            {!parkingSession.no_endtime &&
              !!parkingSession.ps_right_id &&
              (parkingSession.status === ParkingSessionStatus.active ||
                parkingSession.status === ParkingSessionStatus.planned) && (
                <ParkingSessionDetailsAdjustEndTimeButton
                  parkingSession={parkingSession as ParkingSession}
                />
              )}
            {!parkingSession.no_endtime &&
              !!parkingSession.ps_right_id &&
              parkingSession.status === ParkingSessionStatus.active && (
                <ParkingSessionDetailsStopButton
                  parkingSession={parkingSession as ParkingSession}
                />
              )}
            {!parkingSession.no_endtime &&
              !!parkingSession.ps_right_id &&
              parkingSession.status === ParkingSessionStatus.planned && (
                <ParkingSessionDetailsDeleteButton
                  parkingSession={parkingSession as ParkingSession}
                />
              )}
            {!!money_balance_applicable &&
              'is_paid' in parkingSession &&
              !parkingSession.is_paid && (
                <AlertBase
                  testID="ParkingSessionDetailsNotPaidAlert"
                  text="Even geduld."
                  title="We verwerken uw betaling"
                  variant={AlertVariant.information}
                />
              )}
          </>
        )}
        {parkingAccount?.scope === ParkingPermitScope.visitor &&
          parkingSession.status === ParkingSessionStatus.active &&
          !!parkingSession.ps_right_id && (
            <ParkingSessionDetailsVisitorExtendButton
              parkingSession={parkingSession as ParkingSession}
            />
          )}
      </Column>
    </Box>
  )
}
