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
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingHistorySession,
  ParkingPermitScope,
  ParkingSession,
  ParkingSessionStatus,
  PermitType,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {getPermitZoneIdentifier} from '@/modules/parking/utils/getPermitZoneIdentifier'
import {
  getPaymentZone,
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

  const parkingAccount = useParkingAccount()
  const licensePlateString = `${parkingSession.vehicle_id}${parkingSession.visitor_name ? ' - ' + parkingSession.visitor_name : ''}`

  const {permits, isLoading} = useGetPermits()
  const {
    permit_zone,
    parking_rate,
    payment_zones,
    money_balance_applicable,
    permit_type,
  } =
    permits?.find(
      permit =>
        permit.report_code.toString() === parkingSession.report_code.toString(),
    ) ?? {}

  const paymentZoneId = parkingSession.payment_zone_id

  const paymentZone =
    paymentZoneId && payment_zones
      ? getPaymentZone(payment_zones, paymentZoneId)
      : undefined

  const startTimePaymentZoneDay = paymentZone
    ? getPaymentZoneDay(
        paymentZone,
        dayjs(parkingSession.start_date_time).day(),
      )
    : undefined

  const parkingRateTimeString = useMemo(() => {
    const timeString = startTimePaymentZoneDay
      ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
      : undefined

    const parkingRate = parking_rate?.value
      ? formatNumber(parking_rate?.value, parking_rate?.currency)
      : undefined

    if (timeString && parkingRate) {
      return `${timeString}, ${parkingRate} per uur`
    }
  }, [startTimePaymentZoneDay, parking_rate])

  const directionsUrl = useGetGoogleMapsDirectionsUrl({lat: 2, lon: 2}) //NOTE: coordinates of parking machine when api is ready

  const shouldShowCosts =
    !!money_balance_applicable &&
    'parking_cost' in parkingSession &&
    !!parkingSession.parking_cost?.value &&
    !!parkingSession.parking_cost?.currency

  return (
    <Box>
      <Column gutter="lg">
        <ParkingSessionDetailsRow
          icon="parkingCar"
          title="Kenteken">
          <Phrase>{licensePlateString}</Phrase>
        </ParkingSessionDetailsRow>

        {(permit_type === PermitType.bezoekersvergunning ||
          permit_type === PermitType.kraskaartvergunning) && (
          <ParkingSessionDetailsRow
            icon="location"
            title={`Parkeerautomaat ${parkingSession.ps_right_id}`} //NOTE: check if correct prop
          >
            {/* NOTE: dynamic data when parking machine api is ready */}
            <Phrase>Rozenstraat 209</Phrase>
            {!!parkingRateTimeString && (
              <Phrase>{parkingRateTimeString}</Phrase>
            )}

            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="PollingStationDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          </ParkingSessionDetailsRow>
        )}
        {permit_type !== PermitType.bezoekersvergunning &&
          permit_type !== PermitType.kraskaartvergunning && (
            <>
              {isLoading ? (
                <PleaseWait testID="ParkingSessionPleaseWait" />
              ) : (
                <ParkingSessionDetailsRow
                  icon="location"
                  title={getPermitZoneIdentifier(permit_zone)}>
                  {/* NOTE Deprecated because of different rates within zones? */}
                  {!!parkingRateTimeString && (
                    <Phrase>{parkingRateTimeString}</Phrase>
                  )}

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
            </>
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
                parkingSession.parking_cost.value,
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
