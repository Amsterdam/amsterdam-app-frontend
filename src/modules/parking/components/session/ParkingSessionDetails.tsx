import {ReactNode, useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useChangeSessionMutation} from '@/modules/parking/service'
import {ParkingSession, ParkingSessionStatus} from '@/modules/parking/types'
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
  parkingSession: ParkingSession
}

const DetailsRow = ({label, value}: {label: string; value: ReactNode}) => (
  <Row>
    <Column flex={1}>
      <Phrase>{label}</Phrase>
    </Column>
    <Column flex={2}>
      <Phrase emphasis="strong">{value}</Phrase>
    </Column>
  </Row>
)

export const ParkingSessionDetails = ({parkingSession}: Props) => {
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

  const stopSessionText =
    parkingSession.status === ParkingSessionStatus.active
      ? 'Stoppen'
      : 'Verwijderen'

  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [changeSession] = useChangeSessionMutation()
  const {goBack} = useNavigation()

  const onPressStop = useCallback(() => {
    Alert.alert(
      'Weet u zeker dat u deze parkeersessie wilt stoppen?',
      'Deze actie kan niet ongedaan worden gemaakt.',
      [
        {text: 'Annuleren', style: 'cancel', onPress: () => null},
        {
          text: stopSessionText,
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            if (secureParkingAccount) {
              void changeSession({
                accessToken: secureParkingAccount.accessToken,
                parking_session: {
                  ...parkingSession,
                  end_date_time:
                    parkingSession.status === ParkingSessionStatus.active
                      ? dayjs().toJSON()
                      : parkingSession.start_date_time,
                },
              })
                .unwrap()
                .then(() => {
                  goBack()
                })
            }
          },
        },
      ],
      {cancelable: true},
    )
  }, [
    changeSession,
    goBack,
    parkingSession,
    secureParkingAccount,
    stopSessionText,
  ])

  return (
    <Box>
      <Column gutter="lg">
        <Row gutter="md">
          <Icon
            name="parkingCar"
            size="xl"
          />
          <Title text={licensePlateString} />
        </Row>
        <Column gutter="sm">
          <DetailsRow
            label="Van"
            value={formatDateTimeToDisplay(
              parkingSession.start_date_time,
              false,
            )}
          />
          {!parkingSession.no_endtime && (
            <DetailsRow
              label="Tot"
              value={formatDateTimeToDisplay(
                parkingSession.end_date_time,
                false,
              )}
            />
          )}
          {!parkingSession.no_endtime && (
            <DetailsRow
              label="Parkeertijd"
              value={formatTimeRangeToDisplay(
                parkingSession.start_date_time,
                parkingSession.end_date_time,
              )}
            />
          )}
          {isLoading ? (
            <PleaseWait testID="ParkingSessionPleaseWait" />
          ) : (
            !!parkingSession.money_balance_applicable && (
              <DetailsRow
                label="Tarief"
                value={formatNumber(
                  parking_rate?.value,
                  parking_rate?.currency,
                )}
              />
            )
          )}
          {!!parkingSession.money_balance_applicable && (
            <DetailsRow
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
            !!permit_zone && (
              <DetailsRow
                label="Gebied"
                value={permit_zone.name}
              />
            )
          )}
        </Column>
        {!!parkingSession.money_balance_applicable && !!timeString && (
          <Paragraph>Betaald parkeren van {timeString}</Paragraph>
        )}
        {(parkingSession.status === ParkingSessionStatus.active ||
          parkingSession.status === ParkingSessionStatus.planned) && (
          <Button
            label="Eindtijd aanpassen"
            testID="ParkingSessionDetailsAdjustEndTimeButton"
            variant="secondary"
          />
        )}
        {(parkingSession.status === ParkingSessionStatus.active ||
          parkingSession.status === ParkingSessionStatus.planned) && (
          <Button
            label={stopSessionText}
            onPress={onPressStop}
            testID="ParkingSessionDetailsAdjustEndTimeButton"
            variant="secondaryDestructive"
          />
        )}
        {!!parkingSession.money_balance_applicable &&
          !parkingSession.is_paid && (
            <AlertBase
              testID="ParkingSessionDetailsNotPaidAlert"
              text="Even geduld."
              title="We verwerken uw betaling"
              variant={AlertVariant.information}
            />
          )}
      </Column>
    </Box>
  )
}
