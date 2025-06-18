import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useVisitorVehicleId} from '@/modules/parking/slice'
import {useAlert} from '@/store/slices/alert'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: {vehicle_id: string; visitor_name: string}
  paymentZoneId: string
  startTime: Dayjs
  vehicle_id?: string
}

export const ParkingStartSessionButton = () => {
  const {handleSubmit, formState, setError} = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const {setVisitorVehicleId} = useVisitorVehicleId()
  const {setAlert} = useAlert()

  const [startSession] = useStartSessionMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      paymentZoneId,
      amount,
      licensePlate,
      vehicle_id: visitorVehicleId,
    }: FieldValues) => {
      const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId

      // TODO:
      // check if the limit of current active parking sessions is not reached
      if (vehicleId) {
        return startSession({
          parking_session: {
            report_code: currentPermit.report_code.toString(),
            vehicle_id: vehicleId,
            end_date_time: endTime?.toJSON(),
            start_date_time: startTime.toJSON(),
            payment_zone_id: paymentZoneId,
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

              goBack()
            },
            (error: {
              data?: {code?: string; detail?: {error?: {content?: string}}}
              status?: string
            }) => {
              if (error.data?.detail?.error?.content === 'Start time in past') {
                setError('startTime', {
                  type: 'manual',
                  message: 'Starttijd mag niet in het verleden liggen.',
                })

                return
              }

              setError('root.serverError', {
                type: error?.status,
                message: error.data?.code ?? error.data?.detail?.error?.content,
              })
            },
          )
      }
    },
    [
      startSession,
      currentPermit.report_code,
      goBack,
      setVisitorVehicleId,
      openWebUrl,
      setAlert,
      setError,
    ],
  )

  return (
    <Button
      disabled={formState.isSubmitting}
      iconName="parkingSession"
      label="Bevestig parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingStartSessionButton"
      variant="primary"
    />
  )
}
