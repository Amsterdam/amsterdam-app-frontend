import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingMachineDetails} from '@/modules/parking/components/session/details/ParkingMachineDetails'
import {ParkingSessionDetailsAdjustEndTimeButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsAdjustEndTimeButton'
import {ParkingSessionDetailsDeleteButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsDeleteButton'
import {ParkingSessionDetailsRow} from '@/modules/parking/components/session/details/ParkingSessionDetailsRow'
import {ParkingSessionDetailsStopButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsStopButton'
import {ParkingSessionDetailsVisitorExtendButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsVisitorExtendButton'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingApiVersion,
  ParkingHistorySession,
  ParkingPermitScope,
  ParkingSession,
  ParkingSessionStatus,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {getPermitZoneIdentifier} from '@/modules/parking/utils/getPermitZoneIdentifier'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export type ParkingSessionProps = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionDetails = ({
  parkingSession,
}: ParkingSessionProps) => {
  const {navigate} = useNavigation()
  const apiVersion = useCurrentParkingApiVersion()
  const parkingAccount = useParkingAccount()
  const {permits} = useGetPermits()

  const licensePlateString = `${parkingSession.vehicle_id}${parkingSession.visitor_name ? ' - ' + parkingSession.visitor_name : ''}`

  const {permit_zone, report_code, money_balance_applicable} =
    permits?.find(
      permit =>
        permit.report_code.toString() === parkingSession.report_code.toString(),
    ) ?? {}

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

        {parkingSession.parking_machine &&
        apiVersion === ParkingApiVersion.v2 ? (
          <ParkingMachineDetails
            parkingSession={parkingSession}
            permitId={report_code}
          />
        ) : (
          <ParkingSessionDetailsRow
            icon="location"
            title={getPermitZoneIdentifier(permit_zone)}>
            <NavigationButton
              emphasis="default"
              iconSize="smd"
              insetHorizontal="no"
              insetVertical="no"
              onPress={() => navigate(ParkingRouteName.parkingPermitZones)}
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
