import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionDetailsAdjustEndTimeButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsAdjustEndTimeButton'
import {ParkingSessionDetailsDeleteButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsDeleteButton'
import {ParkingSessionDetailsRow} from '@/modules/parking/components/session/details/ParkingSessionDetailsRow'
import {ParkingSessionDetailsStopButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsStopButton'
import {ParkingSessionDetailsVisitorExtendButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsVisitorExtendButton'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {
  ParkingPermitScope,
  ParkingSession,
  ParkingSessionStatus,
  VisitorParkingSession,
} from '@/modules/parking/types'
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
  parkingSession: ParkingSession | VisitorParkingSession
}

export const ParkingSessionDetails = ({parkingSession}: Props) => {
  const parkingAccount = useParkingAccount()
  const licensePlateString = `${parkingSession.vehicle_id}${parkingSession.visitor_name ? ' - ' + parkingSession.visitor_name : ''}`

  const {permits, isLoading} = useGetPermits()
  const {permit_zone, parking_rate, payment_zones} =
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

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  return (
    <Box>
      <Column gutter="lg">
        <Row gutter="md">
          <Icon
            name="parkingCar"
            size="xl"
            testID="ParkingSessionDetailsIcon"
          />
          <Title
            level="h2"
            text={licensePlateString}
          />
        </Row>
        <Column gutter="sm">
          <ParkingSessionDetailsRow
            label="Van"
            value={formatDateTimeToDisplay(
              parkingSession.start_date_time,
              false,
            )}
          />
          {!parkingSession.no_endtime && (
            <ParkingSessionDetailsRow
              label="Tot"
              value={formatDateTimeToDisplay(
                parkingSession.end_date_time,
                false,
              )}
            />
          )}
          {!parkingSession.no_endtime && (
            <ParkingSessionDetailsRow
              label="Parkeertijd"
              value={formatTimeRangeToDisplay(
                parkingSession.start_date_time,
                parkingSession.end_date_time,
              )}
            />
          )}
          {!!parkingSession.money_balance_applicable &&
            'parking_cost' in parkingSession &&
            parkingSession.parking_cost?.value &&
            'parking_cost' in parkingSession &&
            parkingSession.parking_cost?.currency && (
              <ParkingSessionDetailsRow
                label="Kosten"
                value={formatNumber(
                  parkingSession.parking_cost.value,
                  parkingSession.parking_cost.currency,
                )}
              />
            )}
          {isLoading ? (
            <PleaseWait testID="ParkingSessionPleaseWait" />
          ) : (
            !!parkingSession.money_balance_applicable && (
              <ParkingSessionDetailsRow
                label="Tarief"
                value={`${formatNumber(
                  parking_rate?.value,
                  parking_rate?.currency,
                )} per uur`}
              />
            )
          )}
          {isLoading ? (
            <PleaseWait testID="ParkingSessionPleaseWait" />
          ) : (
            !!permit_zone && (
              <ParkingSessionDetailsRow
                label="Gebied"
                value={permit_zone.name}
              />
            )
          )}
        </Column>
        {!!parkingSession.money_balance_applicable && !!timeString && (
          <Paragraph>Betaald parkeren van {timeString}</Paragraph>
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
            {!!parkingSession.money_balance_applicable &&
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
          parkingSession.status === ParkingSessionStatus.active && (
            <ParkingSessionDetailsVisitorExtendButton
              defaultStartTime={parkingSession.end_date_time}
            />
          )}
      </Column>
    </Box>
  )
}
