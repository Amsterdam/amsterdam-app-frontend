import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useActivateSessionMutation} from '@/modules/parking/service'
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

export const ParkingActivateLicensePlateButton = () => {
  const {goBack} = useNavigation()
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const currentPermit = useCurrentParkingPermit()
  const {setVisitorVehicleId} = useVisitorVehicleId()
  const {setAlert} = useAlert()

  const [activateSession, {isLoading}] = useActivateSessionMutation()

  const {
    handleSubmit,
    formState: {isSubmitting},
    setError,
  } = useFormContext<FieldValues>()

  const {report_code} = currentPermit

  const onSubmit = useCallback(
    ({licensePlate, vehicle_id: visitorVehicleId}: FieldValues) => {
      const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId

      if (vehicleId) {
        return activateSession({
          report_code: report_code.toString(),
          vehicle_id: vehicleId,
        })
          .unwrap()
          .then(
            () => {
              if (visitorVehicleId) {
                setVisitorVehicleId(visitorVehicleId)
              }

              setAlert(alerts.startSessionSuccess)
              void registerDeviceIfPermitted(true)
              goBack()
            },
            (error: {
              data?: {code?: string; detail?: string}
              status?: string
            }) => {
              setError('root.serverError', {
                type: error?.status,
                message: error.data?.code,
              })
            },
          )
      }
    },
    [
      activateSession,
      report_code,
      registerDeviceIfPermitted,
      goBack,
      setVisitorVehicleId,
      setAlert,
      setError,
    ],
  )

  return (
    <Button
      disabled={isSubmitting || isLoading}
      iconName="parkingSession"
      isLoading={isLoading}
      label="Activeer kenteken"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingActivateLicense${currentPermit.permit_type}Button`}
      variant="primary"
    />
  )
}
