import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {alerts} from '@/modules/parking/alerts'
import {ParkingAddMoneyButton} from '@/modules/parking/components/ParkingAddMoneyButton'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingApiVersion} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'
import {Dayjs} from '@/utils/datetime/dayjs'

export type SessionFieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: {vehicle_id: string; visitor_name: string}
  parking_machine?: string
  parking_machine_favorite?: boolean
  paymentZoneId?: string
  startTime: Dayjs
  vehicle_id?: string
}

export const ParkingStartSessionButton = () => {
  const {
    handleSubmit,
    formState: {isSubmitting, errors},
    setError,
  } = useFormContext<SessionFieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const {report_code} = currentPermit
  const apiVersion = useCurrentParkingApiVersion()
  const isTimebalanceInsufficient =
    errors.root?.serverError?.message?.includes('Timebalance insufficient') ||
    errors.root?.localError?.type === 'isTimeBalanceInsufficient'
  const isWalletBalanceInsufficient =
    errors.root?.serverError?.message === 'SSP_BALANCE_TOO_LOW' ||
    errors.root?.localError?.type === 'isWalletBalanceInsufficient'
  const {setVisitorVehicleId} = useVisitorVehicleId()
  const {setAlert} = useAlert()

  const [startSession, {isLoading}] = useStartSessionMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const {registerDeviceIfPermitted} = useRegisterDevice()

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      amount,
      licensePlate,
      parking_machine,
      parking_machine_favorite,
      paymentZoneId,
      vehicle_id: visitorVehicleId,
    }: SessionFieldValues) => {
      const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId

      // TODO:
      // check if the limit of current active parking sessions is not reached
      if (vehicleId) {
        return startSession({
          parking_session: {
            end_date_time: endTime?.toJSON(),
            parking_machine,
            parking_machine_favorite: !!parking_machine_favorite,
            payment_zone_id: paymentZoneId,
            report_code: report_code.toString(),
            start_date_time: startTime.toJSON(),
            vehicle_id: vehicleId,
          },
          ...(amount
            ? {
                balance: {
                  amount,
                  currency: 'EUR',
                },
                redirect: {
                  merchant_return_url:
                    'amsterdam://parking/start-session-and-increase-balance/return',
                },
                locale: 'nl',
              }
            : {}),
        })
          .unwrap()
          .then(
            result => {
              if (visitorVehicleId) {
                setVisitorVehicleId(visitorVehicleId)
              }

              if (result.redirect_url) {
                openWebUrl(result.redirect_url)
              } else {
                setAlert(alerts.startSessionSuccess)
              }

              void registerDeviceIfPermitted(true)
              goBack()
            },
            (error: {
              data?: {code?: string; detail?: string}
              status?: string
            }) => {
              const detail = error.data?.detail || ''

              // Match error messages as plain text
              if (detail.toLowerCase().includes('start time in past')) {
                setError('startTime', {
                  type: 'manual',
                  message: 'Starttijd mag niet in het verleden liggen.',
                })

                return
              }

              setError('root.serverError', {
                type: error?.status,
                message: detail || error.data?.code,
              })
            },
          )
      }
    },
    [
      startSession,
      report_code,
      registerDeviceIfPermitted,
      goBack,
      setVisitorVehicleId,
      openWebUrl,
      setAlert,
      setError,
    ],
  )

  if (isTimebalanceInsufficient) {
    return (
      <Button
        label="Sluiten"
        onPress={goBack}
        testID="ParkingStartSessionCloseButton"
      />
    )
  }

  if (isWalletBalanceInsufficient && apiVersion === ParkingApiVersion.v2) {
    return <ParkingAddMoneyButton />
  }

  return (
    <Button
      disabled={isSubmitting || isLoading}
      iconName="parkingSession"
      isLoading={isLoading}
      label="Bevestig parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingStartSession${currentPermit.permit_type}Button`}
      variant="primary"
    />
  )
}
